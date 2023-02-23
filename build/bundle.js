
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/Button.svelte generated by Svelte v3.55.1 */

    const file$5 = "src/components/Button.svelte";

    function create_fragment$5(ctx) {
    	let button;
    	let t;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text(/*buttonText*/ ctx[0]);
    			attr_dev(button, "class", "clickbutton svelte-190t45f");
    			toggle_class(button, "printbutton", /*printbutton*/ ctx[1] === true);
    			add_location(button, file$5, 7, 0, 94);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*buttonText*/ 1) set_data_dev(t, /*buttonText*/ ctx[0]);

    			if (dirty & /*printbutton*/ 2) {
    				toggle_class(button, "printbutton", /*printbutton*/ ctx[1] === true);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, []);
    	let { buttonText = "click" } = $$props;
    	let { printbutton = false } = $$props;
    	const writable_props = ['buttonText', 'printbutton'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('buttonText' in $$props) $$invalidate(0, buttonText = $$props.buttonText);
    		if ('printbutton' in $$props) $$invalidate(1, printbutton = $$props.printbutton);
    	};

    	$$self.$capture_state = () => ({ buttonText, printbutton });

    	$$self.$inject_state = $$props => {
    		if ('buttonText' in $$props) $$invalidate(0, buttonText = $$props.buttonText);
    		if ('printbutton' in $$props) $$invalidate(1, printbutton = $$props.printbutton);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [buttonText, printbutton, click_handler];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { buttonText: 0, printbutton: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get buttonText() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set buttonText(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get printbutton() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set printbutton(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/TextArea.svelte generated by Svelte v3.55.1 */

    const file$4 = "src/components/TextArea.svelte";

    function create_fragment$4(ctx) {
    	let label;
    	let t1;
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			label.textContent = "Type demerit details here";
    			t1 = space();
    			textarea = element("textarea");
    			attr_dev(label, "for", "textarea");
    			attr_dev(label, "class", "svelte-grxuqj");
    			add_location(label, file$4, 2, 0, 19);
    			attr_dev(textarea, "name", "textarea");
    			attr_dev(textarea, "rows", "20");
    			attr_dev(textarea, "placeholder", "Write demerit details here ...");
    			attr_dev(textarea, "class", "svelte-grxuqj");
    			add_location(textarea, file$4, 3, 0, 75);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, textarea, anchor);

    			if (!mounted) {
    				dispose = listen_dev(textarea, "focus", focus_handler$1, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(textarea);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const focus_handler$1 = e => {
    	e.target.style.outlineStyle = "none";
    };

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextArea', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TextArea> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class TextArea extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextArea",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/Input.svelte generated by Svelte v3.55.1 */

    const file$3 = "src/components/Input.svelte";

    function create_fragment$3(ctx) {
    	let label;
    	let t0_value = /*labelTag*/ ctx[0].replace(/-/g, " ") + "";
    	let t0;
    	let br;
    	let t1;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			t0 = text(t0_value);
    			br = element("br");
    			t1 = space();
    			input = element("input");
    			attr_dev(label, "for", /*labelTag*/ ctx[0]);
    			attr_dev(label, "class", "svelte-tsy98w");
    			add_location(label, file$3, 9, 0, 132);
    			add_location(br, file$3, 9, 61, 193);
    			attr_dev(input, "type", /*type*/ ctx[1]);
    			attr_dev(input, "name", /*labelTag*/ ctx[0]);
    			attr_dev(input, "class", "inputtag svelte-tsy98w");
    			attr_dev(input, "placeholder", /*def*/ ctx[2]);
    			attr_dev(input, "min", /*min*/ ctx[3]);
    			input.required = true;
    			add_location(input, file$3, 10, 0, 198);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, t0);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, input, anchor);

    			if (!mounted) {
    				dispose = listen_dev(input, "focus", focus_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*labelTag*/ 1 && t0_value !== (t0_value = /*labelTag*/ ctx[0].replace(/-/g, " ") + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*labelTag*/ 1) {
    				attr_dev(label, "for", /*labelTag*/ ctx[0]);
    			}

    			if (dirty & /*type*/ 2) {
    				attr_dev(input, "type", /*type*/ ctx[1]);
    			}

    			if (dirty & /*labelTag*/ 1) {
    				attr_dev(input, "name", /*labelTag*/ ctx[0]);
    			}

    			if (dirty & /*def*/ 4) {
    				attr_dev(input, "placeholder", /*def*/ ctx[2]);
    			}

    			if (dirty & /*min*/ 8) {
    				attr_dev(input, "min", /*min*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const focus_handler = e => {
    	e.target.style.outlineStyle = "none";
    };

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Input', slots, []);
    	let { labelTag = "" } = $$props;
    	let { type = "text" } = $$props;
    	let { def = "" } = $$props;
    	let { min = null } = $$props;
    	const writable_props = ['labelTag', 'type', 'def', 'min'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Input> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('labelTag' in $$props) $$invalidate(0, labelTag = $$props.labelTag);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('def' in $$props) $$invalidate(2, def = $$props.def);
    		if ('min' in $$props) $$invalidate(3, min = $$props.min);
    	};

    	$$self.$capture_state = () => ({ labelTag, type, def, min });

    	$$self.$inject_state = $$props => {
    		if ('labelTag' in $$props) $$invalidate(0, labelTag = $$props.labelTag);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('def' in $$props) $$invalidate(2, def = $$props.def);
    		if ('min' in $$props) $$invalidate(3, min = $$props.min);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [labelTag, type, def, min];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { labelTag: 0, type: 1, def: 2, min: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get labelTag() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelTag(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get def() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set def(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get min() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/views/BodyParts.svelte generated by Svelte v3.55.1 */

    const { console: console_1 } = globals;
    const file$2 = "src/views/BodyParts.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (100:8) {#each Array.from(Array(24).keys(),n=>n+1) as n}
    function create_each_block_1(ctx) {
    	let option;
    	let t_value = /*n*/ ctx[12] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*n*/ ctx[12];
    			option.value = option.__value;
    			add_location(option, file$2, 100, 12, 3518);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(100:8) {#each Array.from(Array(24).keys(),n=>n+1) as n}",
    		ctx
    	});

    	return block;
    }

    // (105:8) {#each Array.from(Array(60).keys(),n=>n+1) as n}
    function create_each_block(ctx) {
    	let option;
    	let t_value = /*n*/ ctx[12] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*n*/ ctx[12];
    			option.value = option.__value;
    			add_location(option, file$2, 105, 12, 3691);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(105:8) {#each Array.from(Array(60).keys(),n=>n+1) as n}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let input0;
    	let br0;
    	let t0;
    	let input1;
    	let br1;
    	let t1;
    	let input2;
    	let br2;
    	let t2;
    	let hr0;
    	let t3;
    	let input3;
    	let br3;
    	let t4;
    	let label;
    	let t6;
    	let select0;
    	let t7;
    	let select1;
    	let t8;
    	let select2;
    	let option0;
    	let option1;
    	let br4;
    	let t11;
    	let input4;
    	let br5;
    	let t12;
    	let hr1;
    	let t13;
    	let textarea;
    	let t14;
    	let br6;
    	let t15;
    	let button;
    	let current;

    	input0 = new Input({
    			props: { labelTag: "Name", def: "Jon/Jane Doe" },
    			$$inline: true
    		});

    	input1 = new Input({
    			props: { labelTag: "Date", type: "date" },
    			$$inline: true
    		});

    	input2 = new Input({
    			props: { labelTag: "HR-Number", def: "111111111" },
    			$$inline: true
    		});

    	input3 = new Input({
    			props: {
    				labelTag: "Demerit-points",
    				type: "number",
    				def: "0",
    				min: 0
    			},
    			$$inline: true
    		});

    	let each_value_1 = Array.from(Array(24).keys(), func);
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = Array.from(Array(60).keys(), func_1);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	input4 = new Input({
    			props: {
    				labelTag: "Who-assigned-the-demerit",
    				def: "Captain ..."
    			},
    			$$inline: true
    		});

    	textarea = new TextArea({ $$inline: true });

    	button = new Button({
    			props: { printbutton: true, buttonText: "print" },
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[11]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(input0.$$.fragment);
    			br0 = element("br");
    			t0 = space();
    			create_component(input1.$$.fragment);
    			br1 = element("br");
    			t1 = space();
    			create_component(input2.$$.fragment);
    			br2 = element("br");
    			t2 = space();
    			hr0 = element("hr");
    			t3 = space();
    			create_component(input3.$$.fragment);
    			br3 = element("br");
    			t4 = space();
    			label = element("label");
    			label.textContent = "Time of Demerit";
    			t6 = space();
    			select0 = element("select");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t7 = space();
    			select1 = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t8 = space();
    			select2 = element("select");
    			option0 = element("option");
    			option0.textContent = "AM";
    			option1 = element("option");
    			option1.textContent = "PM";
    			br4 = element("br");
    			t11 = space();
    			create_component(input4.$$.fragment);
    			br5 = element("br");
    			t12 = space();
    			hr1 = element("hr");
    			t13 = space();
    			create_component(textarea.$$.fragment);
    			t14 = space();
    			br6 = element("br");
    			t15 = space();
    			create_component(button.$$.fragment);
    			add_location(br0, file$2, 91, 47, 3097);
    			add_location(br1, file$2, 92, 40, 3142);
    			add_location(br2, file$2, 93, 47, 3194);
    			add_location(hr0, file$2, 94, 4, 3203);
    			add_location(br3, file$2, 95, 68, 3276);
    			attr_dev(label, "for", "hours");
    			set_style(label, "margin-bottom", "10px");
    			add_location(label, file$2, 97, 4, 3337);
    			attr_dev(select0, "name", "hours");
    			attr_dev(select0, "id", "hours-tag");
    			add_location(select0, file$2, 98, 4, 3412);
    			attr_dev(select1, "name", "minutes");
    			attr_dev(select1, "id", "minutes");
    			add_location(select1, file$2, 103, 4, 3585);
    			option0.__value = "am";
    			option0.value = option0.__value;
    			attr_dev(option0, "default", "");
    			add_location(option0, file$2, 109, 8, 3801);
    			option1.__value = "pm";
    			option1.value = option1.__value;
    			add_location(option1, file$2, 110, 8, 3848);
    			attr_dev(select2, "name", "ampm");
    			attr_dev(select2, "id", "ampm-tag");
    			add_location(select2, file$2, 108, 4, 3758);
    			add_location(br4, file$2, 111, 13, 3892);
    			add_location(br5, file$2, 112, 66, 3963);
    			add_location(hr1, file$2, 113, 4, 3972);
    			add_location(br6, file$2, 115, 4, 3997);
    			attr_dev(div, "class", "bodypart svelte-1p847lo");
    			add_location(div, file$2, 89, 0, 3026);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(input0, div, null);
    			append_dev(div, br0);
    			append_dev(div, t0);
    			mount_component(input1, div, null);
    			append_dev(div, br1);
    			append_dev(div, t1);
    			mount_component(input2, div, null);
    			append_dev(div, br2);
    			append_dev(div, t2);
    			append_dev(div, hr0);
    			append_dev(div, t3);
    			mount_component(input3, div, null);
    			append_dev(div, br3);
    			append_dev(div, t4);
    			append_dev(div, label);
    			append_dev(div, t6);
    			append_dev(div, select0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(select0, null);
    			}

    			append_dev(div, t7);
    			append_dev(div, select1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select1, null);
    			}

    			append_dev(div, t8);
    			append_dev(div, select2);
    			append_dev(select2, option0);
    			append_dev(select2, option1);
    			append_dev(div, br4);
    			append_dev(div, t11);
    			mount_component(input4, div, null);
    			append_dev(div, br5);
    			append_dev(div, t12);
    			append_dev(div, hr1);
    			append_dev(div, t13);
    			mount_component(textarea, div, null);
    			append_dev(div, t14);
    			append_dev(div, br6);
    			append_dev(div, t15);
    			mount_component(button, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Array*/ 0) {
    				each_value_1 = Array.from(Array(24).keys(), func);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(select0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*Array*/ 0) {
    				each_value = Array.from(Array(60).keys(), func_1);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(input0.$$.fragment, local);
    			transition_in(input1.$$.fragment, local);
    			transition_in(input2.$$.fragment, local);
    			transition_in(input3.$$.fragment, local);
    			transition_in(input4.$$.fragment, local);
    			transition_in(textarea.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(input0.$$.fragment, local);
    			transition_out(input1.$$.fragment, local);
    			transition_out(input2.$$.fragment, local);
    			transition_out(input3.$$.fragment, local);
    			transition_out(input4.$$.fragment, local);
    			transition_out(textarea.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(input0);
    			destroy_component(input1);
    			destroy_component(input2);
    			destroy_component(input3);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			destroy_component(input4);
    			destroy_component(textarea);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = n => n + 1;
    const func_1 = n => n + 1;

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BodyParts', slots, []);
    	var textArea;
    	var time;
    	var points;
    	var assigner;
    	var inputs;
    	var desc;
    	var name;
    	var date;
    	var hrNum;
    	let { window } = $$props;

    	var printCommand = () => {
    		let mainContent = document.getElementById("main-component");
    		let CurrentArray = Array.from(mainContent.childNodes);

    		CurrentArray = CurrentArray.filter(val => {
    			return val.data != " ";
    		});

    		//Create the new window
    		let height = 8.5 * 96;

    		let width = 11 * 96;
    		let newWindow = window.open("", "PRINT", `height=${height}px, width=${width}px`);

    		//Add the main-component to the new page
    		newWindow.document.write("<div id='main-component'></div>");

    		let newMainComponent = newWindow.document.getElementById("main-component");

    		//Save the content to the new window
    		newMainComponent.innerHTML = mainContent.innerHTML;

    		let newMainArray = Array.from(newMainComponent.childNodes);

    		//Parse the array
    		newMainArray = newMainArray.filter(val => {
    			return val.data != " ";
    		});

    		//Save the current styles to the new page
    		newMainComponent.setAttribute("style", mainContent.getAttribute("style"));

    		//Save the inner components styles from this page to the new page
    		for (let i = 0; i < newMainArray.length; i++) {
    			newMainArray[i].setAttribute("style", CurrentArray[i].getAttribute("style"));
    		}

    		newWindow.focus();
    	};

    	onMount(async () => {
    		$$invalidate(10, window);
    		$$invalidate(0, textArea = document.getElementsByTagName("textarea")[0]);
    		$$invalidate(1, time = document.getElementById("time"));
    		$$invalidate(2, points = document.getElementById("demerit-points"));
    		$$invalidate(3, assigner = document.getElementById("assigned"));
    		$$invalidate(5, desc = document.getElementById("demerit-description"));
    		$$invalidate(6, name = document.getElementById("name-text"));
    		$$invalidate(7, date = document.getElementById("date-text"));
    		$$invalidate(8, hrNum = document.getElementById("number-text"));

    		//This tag works on the input
    		$$invalidate(4, inputs = document.getElementsByTagName("input"));

    		$$invalidate(4, inputs = Array.from(inputs));
    		let dateTime = new Date();
    		console.log(dateTime.getHours());
    		console.log(dateTime.getMinutes());
    		let select = document.getElementsByTagName("select");
    		select = Array.from(select);

    		select.forEach(e => {
    			console.log("Hello");

    			if (e.getAttribute("name") == "hours") {
    				e.value = dateTime.getHours();
    			}

    			if (e.getAttribute("name") == "minutes") {
    				e.value = dateTime.getMinutes();
    			}

    			if (e.getAttribute("name") == "ampm") {
    				if (dateTime.getHours() > 12) {
    					e.value = "pm";
    				}
    			}
    		});
    	});

    	$$self.$$.on_mount.push(function () {
    		if (window === undefined && !('window' in $$props || $$self.$$.bound[$$self.$$.props['window']])) {
    			console_1.warn("<BodyParts> was created without expected prop 'window'");
    		}
    	});

    	const writable_props = ['window'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<BodyParts> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		//I want to run value checks here because we want to make sure
    		//the data isn't default
    		console.log(inputs[0].value);

    		/*inputs.forEach((e)=>{
        console.log(e.getAttribute("type"));
        if(["text", "number"].indexOf(e.getAttribute("type")) >= 0 && e.value.length == 0) {
            e.style.outlineStyle = "solid";
            e.style.outlineColor = "#ff0000";
        }
    });*/
    		if (textArea.value.length == 0) {
    			$$invalidate(0, textArea.style.outlineStyle = "solid", textArea);
    			$$invalidate(0, textArea.style.outlineColor = "#ff0000", textArea);
    		}

    		let select = Array.from(document.querySelectorAll("select"));
    		let timeVal = "";

    		select.forEach(e => {
    			timeVal += e.value;

    			if (e.getAttribute("name") == "hours") {
    				timeVal += ":";
    			} else if (e.getAttribute("name") == "minutes") {
    				timeVal += " ";
    			}
    		});

    		$$invalidate(6, name.innerText = inputs[0].value, name); //This is the name that goes in the header
    		$$invalidate(7, date.innerText = inputs[1].value, date); //This is the date input
    		$$invalidate(8, hrNum.innerText = inputs[2].value, hrNum); //This is the hr input
    		$$invalidate(2, points.innerText = inputs[3].value, points); //This is the point input
    		$$invalidate(1, time.innerText = timeVal, time);
    		$$invalidate(3, assigner.innerText = inputs[4].value, assigner); //This will be who has assigned you the demerit

    		//assigner.innerText = inputs[5].value;
    		let char = textArea.value[0].toLowerCase();

    		let val = new String(textArea.value);
    		val = char + val.substring(1);
    		$$invalidate(5, desc.innerText = val, desc);
    		console.log(inputs);
    		printCommand();
    	};

    	$$self.$$set = $$props => {
    		if ('window' in $$props) $$invalidate(10, window = $$props.window);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		Button,
    		TextArea,
    		Input,
    		textArea,
    		time,
    		points,
    		assigner,
    		inputs,
    		desc,
    		name,
    		date,
    		hrNum,
    		window,
    		printCommand
    	});

    	$$self.$inject_state = $$props => {
    		if ('textArea' in $$props) $$invalidate(0, textArea = $$props.textArea);
    		if ('time' in $$props) $$invalidate(1, time = $$props.time);
    		if ('points' in $$props) $$invalidate(2, points = $$props.points);
    		if ('assigner' in $$props) $$invalidate(3, assigner = $$props.assigner);
    		if ('inputs' in $$props) $$invalidate(4, inputs = $$props.inputs);
    		if ('desc' in $$props) $$invalidate(5, desc = $$props.desc);
    		if ('name' in $$props) $$invalidate(6, name = $$props.name);
    		if ('date' in $$props) $$invalidate(7, date = $$props.date);
    		if ('hrNum' in $$props) $$invalidate(8, hrNum = $$props.hrNum);
    		if ('window' in $$props) $$invalidate(10, window = $$props.window);
    		if ('printCommand' in $$props) $$invalidate(9, printCommand = $$props.printCommand);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		textArea,
    		time,
    		points,
    		assigner,
    		inputs,
    		desc,
    		name,
    		date,
    		hrNum,
    		printCommand,
    		window,
    		click_handler
    	];
    }

    class BodyParts extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { window: 10 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BodyParts",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get window() {
    		throw new Error("<BodyParts>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set window(value) {
    		throw new Error("<BodyParts>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/views/DemoView.svelte generated by Svelte v3.55.1 */

    const file$1 = "src/views/DemoView.svelte";

    function create_fragment$1(ctx) {
    	let div4;
    	let img;
    	let img_src_value;
    	let t0;
    	let div3;
    	let div0;
    	let h30;
    	let t1;
    	let span0;
    	let t2;
    	let div1;
    	let h31;
    	let t3;
    	let span1;
    	let t4;
    	let div2;
    	let h32;
    	let t5;
    	let span2;
    	let t6;
    	let h33;
    	let t8;
    	let p;
    	let t9;
    	let span3;
    	let t11;
    	let span4;
    	let t13;
    	let span5;
    	let t15;
    	let span6;
    	let t17;
    	let span7;
    	let t19;
    	let table;
    	let colgroup;
    	let col0;
    	let t20;
    	let col1;
    	let t21;
    	let col2;
    	let t22;
    	let col3;
    	let t23;
    	let tr0;
    	let td0;
    	let t24;
    	let td1;
    	let t26;
    	let td2;
    	let t28;
    	let td3;
    	let t30;
    	let tr1;
    	let td4;
    	let t31;
    	let td5;
    	let t33;
    	let td6;
    	let t35;
    	let td7;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			img = element("img");
    			t0 = space();
    			div3 = element("div");
    			div0 = element("div");
    			h30 = element("h3");
    			t1 = text("Name ");
    			span0 = element("span");
    			t2 = space();
    			div1 = element("div");
    			h31 = element("h3");
    			t3 = text("Date ");
    			span1 = element("span");
    			t4 = space();
    			div2 = element("div");
    			h32 = element("h3");
    			t5 = text("HR # ");
    			span2 = element("span");
    			t6 = space();
    			h33 = element("h3");
    			h33.textContent = "Infraction:";
    			t8 = space();
    			p = element("p");
    			t9 = text("I earned ");
    			span3 = element("span");
    			span3.textContent = "(#)";
    			t11 = text(" demerit points at approximately ");
    			span4 = element("span");
    			span4.textContent = "(time)";
    			t13 = text(" for a/an ");
    			span5 = element("span");
    			span5.textContent = "infraction";
    			t15 = text(". ");
    			span6 = element("span");
    			span6.textContent = "(Who assigned\n    you the demerits, if Capt. Spell out Captain)";
    			t17 = text(" assigned me this demerit report because ");
    			span7 = element("span");
    			span7.textContent = "...";
    			t19 = space();
    			table = element("table");
    			colgroup = element("colgroup");
    			col0 = element("col");
    			t20 = space();
    			col1 = element("col");
    			t21 = space();
    			col2 = element("col");
    			t22 = space();
    			col3 = element("col");
    			t23 = space();
    			tr0 = element("tr");
    			td0 = element("td");
    			t24 = space();
    			td1 = element("td");
    			td1.textContent = "Recruit Signature";
    			t26 = space();
    			td2 = element("td");
    			td2.textContent = "HR #";
    			t28 = space();
    			td3 = element("td");
    			td3.textContent = "Date";
    			t30 = space();
    			tr1 = element("tr");
    			td4 = element("td");
    			t31 = space();
    			td5 = element("td");
    			td5.textContent = "Academy Staff Signature";
    			t33 = space();
    			td6 = element("td");
    			td6.textContent = "HR #";
    			t35 = space();
    			td7 = element("td");
    			td7.textContent = "Date";
    			if (!src_url_equal(img.src, img_src_value = "header.png")) attr_dev(img, "src", img_src_value);
    			set_style(img, "margin-top", "96px");
    			set_style(img, "margin-left", "96px");
    			attr_dev(img, "alt", "Fire Academy Header");
    			add_location(img, file$1, 27, 4, 961);
    			attr_dev(span0, "id", "name-text");
    			add_location(span0, file$1, 43, 88, 1659);
    			attr_dev(h30, "class", "description");
    			set_style(h30, "margin-bottom", "0px");
    			set_style(h30, "font-weight", "normal");
    			add_location(h30, file$1, 43, 12, 1583);
    			attr_dev(div0, "class", "itemblocks");
    			attr_dev(div0, "id", "test");
    			set_style(div0, "font-size", "18px");
    			set_style(div0, "margin-bottom", "0px");
    			set_style(div0, "flex-grow", "2");
    			add_location(div0, file$1, 41, 8, 1479);
    			attr_dev(span1, "id", "date-text");
    			add_location(span1, file$1, 49, 88, 1888);
    			attr_dev(h31, "class", "description");
    			set_style(h31, "margin-bottom", "0px");
    			set_style(h31, "font-weight", "normal");
    			add_location(h31, file$1, 49, 12, 1812);
    			attr_dev(div1, "class", "itemblocks");
    			set_style(div1, "font-size", "18px");
    			set_style(div1, "margin-bottom", "0px");
    			set_style(div1, "flex-grow", "1");
    			add_location(div1, file$1, 47, 8, 1718);
    			attr_dev(span2, "id", "number-text");
    			add_location(span2, file$1, 55, 88, 2117);
    			attr_dev(h32, "class", "description");
    			set_style(h32, "margin-bottom", "0px");
    			set_style(h32, "font-weight", "normal");
    			add_location(h32, file$1, 55, 12, 2041);
    			attr_dev(div2, "class", "itemblocks");
    			set_style(div2, "font-size", "18px");
    			set_style(div2, "margin-bottom", "0px");
    			set_style(div2, "flex-grow", "1");
    			add_location(div2, file$1, 53, 8, 1947);
    			attr_dev(div3, "id", "header");
    			set_style(div3, "width", "calc(6.5*96px)");
    			set_style(div3, "border-bottom", "3px solid #000");
    			set_style(div3, "display", "flex");
    			set_style(div3, "justify-content", "space-between");
    			set_style(div3, "flex-flow", "row");
    			set_style(div3, "flex-wrap", "nowrap");
    			set_style(div3, "margin-left", "96px");
    			add_location(div3, file$1, 37, 4, 1291);
    			attr_dev(h33, "id", "infraction");
    			set_style(h33, "text-transform", "uppercase");
    			set_style(h33, "font-weight", "normal");
    			set_style(h33, "margin-left", "96px");
    			set_style(h33, "font-size", "16px");
    			add_location(h33, file$1, 66, 4, 2314);
    			attr_dev(span3, "id", "demerit-points");
    			add_location(span3, file$1, 72, 113, 2648);
    			attr_dev(span4, "id", "time");
    			add_location(span4, file$1, 72, 182, 2717);
    			attr_dev(span5, "id", "infraction-space");
    			add_location(span5, file$1, 72, 221, 2756);
    			attr_dev(span6, "id", "assigned");
    			add_location(span6, file$1, 72, 268, 2803);
    			attr_dev(span7, "id", "demerit-description");
    			add_location(span7, file$1, 73, 97, 2934);
    			attr_dev(p, "id", "infraction-starting-line");
    			set_style(p, "width", "calc(6.5*96px)");
    			set_style(p, "margin-left", "96px");
    			set_style(p, "font-size", "15.25px");
    			add_location(p, file$1, 72, 4, 2539);
    			attr_dev(col0, "span", "1");
    			set_style(col0, "width", "0%");
    			add_location(col0, file$1, 84, 12, 3386);
    			attr_dev(col1, "span", "1");
    			set_style(col1, "width", "45%");
    			add_location(col1, file$1, 85, 12, 3432);
    			attr_dev(col2, "span", "1");
    			set_style(col2, "width", "30%");
    			add_location(col2, file$1, 86, 12, 3479);
    			attr_dev(col3, "span", "1");
    			set_style(col3, "width", "25%");
    			add_location(col3, file$1, 87, 12, 3526);
    			add_location(colgroup, file$1, 83, 8, 3363);
    			set_style(td0, "box-shadow", "inset 0 0 0 0.25px #000");
    			set_style(td0, "overflow", "hidden");
    			set_style(td0, "padding", "10px");
    			set_style(td0, "padding-top", "5px");
    			set_style(td0, "padding-bottom", "35px");
    			set_style(td0, "font-style", "italic");
    			set_style(td0, "font-size", "14px");
    			add_location(td0, file$1, 97, 12, 3861);
    			set_style(td1, "box-shadow", "inset 0 0 0 0.25px #000");
    			set_style(td1, "overflow", "hidden");
    			set_style(td1, "padding", "10px");
    			set_style(td1, "padding-top", "5px");
    			set_style(td1, "padding-bottom", "35px");
    			set_style(td1, "font-style", "italic");
    			set_style(td1, "font-size", "14px");
    			add_location(td1, file$1, 98, 12, 4031);
    			set_style(td2, "box-shadow", "inset 0 0 0 0.25px #000");
    			set_style(td2, "overflow", "hidden");
    			set_style(td2, "padding", "10px");
    			set_style(td2, "padding-top", "5px");
    			set_style(td2, "padding-bottom", "35px");
    			set_style(td2, "font-style", "italic");
    			set_style(td2, "font-size", "14px");
    			add_location(td2, file$1, 99, 12, 4218);
    			set_style(td3, "box-shadow", "inset 0 0 0 0.25px #000");
    			set_style(td3, "overflow", "hidden");
    			set_style(td3, "padding", "10px");
    			set_style(td3, "padding-top", "5px");
    			set_style(td3, "padding-bottom", "35px");
    			set_style(td3, "font-style", "italic");
    			set_style(td3, "font-size", "14px");
    			add_location(td3, file$1, 100, 12, 4392);
    			add_location(tr0, file$1, 89, 8, 3589);
    			set_style(td4, "box-shadow", "inset 0 0 0 0.25px #000");
    			set_style(td4, "overflow", "hidden");
    			set_style(td4, "padding", "10px");
    			set_style(td4, "padding-top", "5px");
    			set_style(td4, "padding-bottom", "35px");
    			set_style(td4, "font-style", "italic");
    			set_style(td4, "font-size", "14px");
    			add_location(td4, file$1, 103, 12, 4593);
    			set_style(td5, "box-shadow", "inset 0 0 0 0.25px #000");
    			set_style(td5, "overflow", "hidden");
    			set_style(td5, "padding", "10px");
    			set_style(td5, "padding-top", "5px");
    			set_style(td5, "padding-bottom", "35px");
    			set_style(td5, "font-style", "italic");
    			set_style(td5, "font-size", "14px");
    			add_location(td5, file$1, 104, 12, 4763);
    			set_style(td6, "box-shadow", "inset 0 0 0 0.25px #000");
    			set_style(td6, "overflow", "hidden");
    			set_style(td6, "padding", "10px");
    			set_style(td6, "padding-top", "5px");
    			set_style(td6, "padding-bottom", "35px");
    			set_style(td6, "font-style", "italic");
    			set_style(td6, "font-size", "14px");
    			add_location(td6, file$1, 105, 12, 4956);
    			set_style(td7, "box-shadow", "inset 0 0 0 0.25px #000");
    			set_style(td7, "overflow", "hidden");
    			set_style(td7, "padding", "10px");
    			set_style(td7, "padding-top", "5px");
    			set_style(td7, "padding-bottom", "35px");
    			set_style(td7, "font-style", "italic");
    			set_style(td7, "font-size", "14px");
    			add_location(td7, file$1, 106, 12, 5130);
    			add_location(tr1, file$1, 102, 8, 4576);
    			attr_dev(table, "cellspacing", "0");
    			set_style(table, "width", "calc(6.5*96px)");
    			set_style(table, "border-bottom", "0.25px solid #000");
    			set_style(table, "border-right", "0.25px solid #000");
    			set_style(table, "position", "absolute");
    			set_style(table, "bottom", "96px");
    			set_style(table, "left", "96px");
    			add_location(table, file$1, 82, 4, 3193);
    			attr_dev(div4, "id", "main-component");
    			set_style(div4, "width", "calc(8.5*96px)");
    			set_style(div4, "height", "calc(11*96px)");
    			set_style(div4, "position", "relative");
    			set_style(div4, "margin", "100px");
    			set_style(div4, "overflow", "hidden");
    			set_style(div4, "background-color", "#fff");
    			attr_dev(div4, "class", "svelte-1sbd9v8");
    			add_location(div4, file$1, 20, 0, 694);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, img);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div0);
    			append_dev(div0, h30);
    			append_dev(h30, t1);
    			append_dev(h30, span0);
    			append_dev(div3, t2);
    			append_dev(div3, div1);
    			append_dev(div1, h31);
    			append_dev(h31, t3);
    			append_dev(h31, span1);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, h32);
    			append_dev(h32, t5);
    			append_dev(h32, span2);
    			append_dev(div4, t6);
    			append_dev(div4, h33);
    			append_dev(div4, t8);
    			append_dev(div4, p);
    			append_dev(p, t9);
    			append_dev(p, span3);
    			append_dev(p, t11);
    			append_dev(p, span4);
    			append_dev(p, t13);
    			append_dev(p, span5);
    			append_dev(p, t15);
    			append_dev(p, span6);
    			append_dev(p, t17);
    			append_dev(p, span7);
    			append_dev(div4, t19);
    			append_dev(div4, table);
    			append_dev(table, colgroup);
    			append_dev(colgroup, col0);
    			append_dev(colgroup, t20);
    			append_dev(colgroup, col1);
    			append_dev(colgroup, t21);
    			append_dev(colgroup, col2);
    			append_dev(colgroup, t22);
    			append_dev(colgroup, col3);
    			append_dev(table, t23);
    			append_dev(table, tr0);
    			append_dev(tr0, td0);
    			append_dev(tr0, t24);
    			append_dev(tr0, td1);
    			append_dev(tr0, t26);
    			append_dev(tr0, td2);
    			append_dev(tr0, t28);
    			append_dev(tr0, td3);
    			append_dev(table, t30);
    			append_dev(table, tr1);
    			append_dev(tr1, td4);
    			append_dev(tr1, t31);
    			append_dev(tr1, td5);
    			append_dev(tr1, t33);
    			append_dev(tr1, td6);
    			append_dev(tr1, t35);
    			append_dev(tr1, td7);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DemoView', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DemoView> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class DemoView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DemoView",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.55.1 */

    const { window: window_1 } = globals;
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let div6;
    	let div2;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div1;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let div3;
    	let p;
    	let t3;
    	let hr;
    	let t4;
    	let bodyparts;
    	let t5;
    	let div5;
    	let div4;
    	let demoview;
    	let current;
    	let mounted;
    	let dispose;
    	bodyparts = new BodyParts({ props: { window }, $$inline: true });
    	demoview = new DemoView({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			div6 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div1 = element("div");
    			img1 = element("img");
    			t1 = space();
    			div3 = element("div");
    			p = element("p");
    			p.textContent = "Write your data here";
    			t3 = space();
    			hr = element("hr");
    			t4 = space();
    			create_component(bodyparts.$$.fragment);
    			t5 = space();
    			div5 = element("div");
    			div4 = element("div");
    			create_component(demoview.$$.fragment);
    			if (!src_url_equal(img0.src, img0_src_value = "eye.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "width", "35px");
    			attr_dev(img0, "alt", "preview tab");
    			attr_dev(img0, "class", "svelte-10vcc9q");
    			add_location(img0, file, 79, 4, 2233);
    			attr_dev(div0, "class", "images svelte-10vcc9q");
    			add_location(div0, file, 77, 3, 2207);
    			if (!src_url_equal(img1.src, img1_src_value = "generate.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "width", "25px");
    			attr_dev(img1, "alt", "generate text");
    			attr_dev(img1, "class", "svelte-10vcc9q");
    			add_location(img1, file, 85, 4, 2326);
    			attr_dev(div1, "class", "images svelte-10vcc9q");
    			add_location(div1, file, 83, 3, 2300);
    			attr_dev(div2, "id", "close-tab");
    			attr_dev(div2, "class", "svelte-10vcc9q");
    			add_location(div2, file, 62, 2, 1817);
    			attr_dev(p, "class", "svelte-10vcc9q");
    			add_location(p, file, 93, 3, 2438);
    			set_style(hr, "margin-left", "10px");
    			attr_dev(hr, "class", "svelte-10vcc9q");
    			add_location(hr, file, 95, 3, 2470);
    			attr_dev(div3, "id", "editor-area");
    			attr_dev(div3, "class", "svelte-10vcc9q");
    			add_location(div3, file, 91, 2, 2411);
    			attr_dev(div4, "id", "inner-body");
    			attr_dev(div4, "class", "svelte-10vcc9q");
    			add_location(div4, file, 104, 3, 2628);
    			attr_dev(div5, "id", "live-preview");
    			attr_dev(div5, "class", "svelte-10vcc9q");
    			add_location(div5, file, 100, 2, 2546);
    			attr_dev(div6, "id", "main-area");
    			attr_dev(div6, "class", "svelte-10vcc9q");
    			add_location(div6, file, 60, 1, 1793);
    			add_location(main, file, 58, 0, 1784);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div6);
    			append_dev(div6, div2);
    			append_dev(div2, div0);
    			append_dev(div0, img0);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, img1);
    			append_dev(div6, t1);
    			append_dev(div6, div3);
    			append_dev(div3, p);
    			append_dev(div3, t3);
    			append_dev(div3, hr);
    			append_dev(div3, t4);
    			mount_component(bodyparts, div3, null);
    			append_dev(div6, t5);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			mount_component(demoview, div4, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1, "resize", /*resize_handler*/ ctx[2], false, false, false),
    					listen_dev(div2, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(div2, "keydown", prevent_default(keydown_handler), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bodyparts.$$.fragment, local);
    			transition_in(demoview.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bodyparts.$$.fragment, local);
    			transition_out(demoview.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(bodyparts);
    			destroy_component(demoview);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler = () => {
    	
    };

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let wind = null;
    	let toggle = 0;

    	onMount(async () => {
    		wind = window;
    	}); /*window.addEventListener("resize", ()=>{
    	let ea = document.getElementById("editor-area");
    	let ct = document.getElementById("close-tab");
    	ea.removeAttribute("style");
    	ct.removeAttribute("style");
    });*/

    	const resizeCheck = (element, parent) => {
    		let minW = 8.5 * 96 * 0.5;
    		let maxW = 8.5 * 96;

    		if (parent.offsetWidth <= maxW && parent.offsetWidth >= minW) {
    			let scale = 1 - 1 * (1 - parent.offsetWidth / (8.5 * 96));
    			element.style.transform = `scale(${scale})`;
    		} else {
    			element.style.transform = "scale(1.0)";
    		}
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const resize_handler = () => {
    		let mc = document.getElementById("main-component");
    		let livePreview = document.getElementById("live-preview");
    		resizeCheck(mc, livePreview);
    	};

    	const click_handler = e => {
    		let ea = document.getElementById("editor-area");
    		let ct = document.getElementById("close-tab");

    		if (toggle == 0) {
    			ea.style.left = "-100vw";
    			ct.style.right = "calc(100vw - 50px)";
    			$$invalidate(0, toggle += 1);
    		} else {
    			ea.style.left = "0vw";
    			ct.style.right = "-50px";
    			$$invalidate(0, toggle -= 1);
    		}
    	};

    	$$self.$capture_state = () => ({
    		BodyParts,
    		DemoView,
    		onMount,
    		wind,
    		toggle,
    		resizeCheck
    	});

    	$$self.$inject_state = $$props => {
    		if ('wind' in $$props) wind = $$props.wind;
    		if ('toggle' in $$props) $$invalidate(0, toggle = $$props.toggle);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [toggle, resizeCheck, resize_handler, click_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map

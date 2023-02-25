<script>

    import TextArea from "../components/TextArea.svelte";
    import Input from "../components/Input.svelte";

    let inputList = {"name": ["text", "Your name ..."], "date": ["date", "02/14/2023"], "hr-number": ["text", "1111111..."], "demerit-points": ["number", "1"], "who-assigned-the-demerit": ["text", "Captain ...."]}
    

</script>

<div id="editor-block">

    {#each Object.keys(inputList) as name}
       <Input labelTag="{name.charAt(0).toUpperCase() + name.slice(1)}" type="{inputList[name][0]}" def="{inputList[name][1]}"/><br>
       {#if name == "hr-number"}
        <hr>
       {/if}
    {/each}

    <TextArea/>

</div>

<style>

    #editor-block {
        width:480px;
        margin-left:10px;
    }

</style>
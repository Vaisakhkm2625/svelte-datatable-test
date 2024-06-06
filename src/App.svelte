<script lang="ts">
    import { onMount } from "svelte";
    import { loadJSONFile } from "./lib/db";

    let data = [];
    let data1 = {};
    let fetchdata = false;

    function getData() {
        if (localStorage.getItem("testObject") === null) {
            setData();
        }
        data = JSON.parse(localStorage.getItem("testObject"));
    }

    function setData() {
        console.log("fetching data...");
        fetchdata = true;
        const jsonFileUrl = "http://localhost:5173/test/people.json";

        loadJSONFile(jsonFileUrl).then((d) => {
            console.log(d);
            data1 = d;
            localStorage.setItem("testObject", JSON.stringify(d));
        });

        data = JSON.parse(localStorage.getItem("testObject"));
    }

    function removeData() {
        localStorage.removeItem("testObject");
        data = [];
    }

    onMount(() => {
        getData();
    });
</script>

<button on:click={getData}>getdata</button>
<button on:click={removeData}>remove data</button>

{fetchdata}

<div class="container">
    <div style="border: 1px soild red;">{JSON.stringify(data)}</div>
    <div style="border: 1px soild red;">{JSON.stringify(data1)}</div>
</div>

<style>
    .container {
        display: flex;
    }
</style>

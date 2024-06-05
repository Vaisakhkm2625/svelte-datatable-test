<script lang="ts">
    import { onMount } from "svelte";
    import { loadJSONFile } from "./lib/db";

    let data = {};
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

        loadJSONFile(jsonFileUrl).then((data) => {
            localStorage.setItem("testObject", JSON.stringify(data));
        });

        data = JSON.parse(localStorage.getItem("testObject"));
    }

    function removeData() {
        localStorage.removeItem("testObject");
        data = {};
    }

    onMount(() => {
        getData();
    });
</script>

<button on:click={getData}>getdata</button>
<button on:click={removeData}>remove data</button>

{fetchdata}

<div style="display: flex;">
    <div style="border: 1px solid #ff0000;">
        data: {JSON.stringify(data)}
    </div>
    <div style="border: 1px solid #0000ff;">
        data1: {JSON.stringify(data1)}
    </div>
</div>

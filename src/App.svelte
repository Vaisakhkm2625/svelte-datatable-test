<script lang="ts">
    import { onMount } from "svelte";
    import { loadJSONFile } from "./lib/db";

    let data = {};
    let data1 = {};

    function getData() {
        if (localStorage.getItem("testObject") === null) {
            setData();
        }
        data = JSON.parse(localStorage.getItem("testObject"));
    }

    function setData() {
        console.log("fetching data...");
        const jsonFileUrl = "http://localhost:5173/test/people.json";

        loadJSONFile(jsonFileUrl).then((data) => {
            localStorage.setItem("testObject", JSON.stringify(data));
        });
        data = JSON.parse(localStorage.getItem("testObject"));
    }

    onMount(() => {
        setData();
    });
</script>

data: {JSON.stringify(data)}
data1: {JSON.stringify(data1)}

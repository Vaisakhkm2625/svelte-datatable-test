<script>
    import { DataHandler } from "@vincjo/datatables";
    //import data from "$site/data/data";
    import data from "./lib/people";
    import Th from "./Th.svelte";

    const handler = new DataHandler(data, { rowsPerPage: 100 });
    const rows = handler.getRows();
    const rowcount = handler.getRowCount();
</script>


{$rowcount.total}

<table>
    <thead>
        <tr>
            <Th {handler} orderBy="first_name">First name</Th>
            <Th {handler}>Last name</Th>
            <Th {handler}>Email</Th>
        </tr>
    </thead>
    <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.phone_number}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        text-align: left;
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
    }
    td,
    th {
        padding: 4px 20px;
        border-bottom: 1px solid #eee;
    }
</style>

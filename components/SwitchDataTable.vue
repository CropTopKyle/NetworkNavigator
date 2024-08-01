<script setup lang="ts">
  import type {
    ColumnDef,
    ColumnFiltersState,
    ExpandedState,
    SortingState,
    VisibilityState,
  } from '@tanstack/vue-table'
  import {
    FlexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
  } from '@tanstack/vue-table'
  import { h, ref } from 'vue'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import { valueUpdater } from '@/lib/utils'

  interface Switch {
    IDF: string
    hostname: string
    location: string
    notes: string
  }

  const data = ref<Switch[]>([])

  onMounted(async () => {
    try {
      console.log('Attempting to fetch switch data')
      const response = await fetch('/api/switches')
      if (!response.ok) throw new Error('Network response was not ok')
      data.value = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Failed to fetch switch data:', error)
    }
  })

  const columns: ColumnDef<Switch>[] = [
    {
      accessorKey: 'IDF',
      header: 'IDF',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('IDF')),
    },
    {
      accessorKey: 'hostname',
      header: 'Hostname',
      cell: ({ row }) =>
        h('div', { class: 'capitalize' }, row.getValue('hostname')),
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) =>
        h('div', { class: 'capitalize' }, row.getValue('location')),
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }) =>
        h('div', { class: 'capitalize' }, row.getValue('notes')),
    },
  ]

  const sorting = ref<SortingState>([])
  const columnFilters = ref<ColumnFiltersState>([])
  const columnVisibility = ref<VisibilityState>({})
  const rowSelection = ref({})
  const expanded = ref<ExpandedState>({})

  const table = useVueTable({
    get data() {
      return data.value
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) =>
      valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) =>
      valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: (updaterOrValue) =>
      valueUpdater(updaterOrValue, rowSelection),
    onExpandedChange: (updaterOrValue) =>
      valueUpdater(updaterOrValue, expanded),
    state: {
      get sorting() {
        return sorting.value
      },
      get columnFilters() {
        return columnFilters.value
      },
      get columnVisibility() {
        return columnVisibility.value
      },
      get rowSelection() {
        return rowSelection.value
      },
      get expanded() {
        return expanded.value
      },
    },
  })
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 items-center py-4">
      <!-- <Input
        class="max-w-sm"
        placeholder="Quick Search"
        :model-value="table.getColumn('email')?.getFilterValue() as string"
        @update:model-value="
          table.getColumn('email')?.setFilterValue($event)
        " /> -->
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length"> </template>
          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="space-x-2"></div>
    </div>
  </div>
</template>

import 'devextreme/dist/css/dx.material.purple.dark.compact.css';
import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { SessionService } from 'services/session-service';
import DataGrid from 'devextreme/ui/data_grid';

@inject(Router, EventAggregator, SessionService)
export class DxDataGrid {
    @bindable items = null;
    @bindable columns;
    @bindable load;
    @bindable filterVisible = true;
    @bindable headerFilterVisible = false;
    @bindable onExportToExcel = false;
    @bindable pendingOnly;
    @bindable hiddenFilter;
    @bindable searchPanelVisible = true;
    @bindable onRowUpdating;
    @bindable onRowPrepared;
    @bindable allowAdding = false;
    @bindable allowEditing = false;
    @bindable allowDeleting = false;
    @bindable allowChoosing = false;
    @bindable masterDetail: any = {};
    @bindable extraParams = {};
    @bindable searchPanelText;
    @bindable storageKey;
    @bindable allowColumnResizing;
    @bindable allowColumnReordering;
    @bindable columnResizingMode;
    @bindable confirmDeleteMessage;
    @bindable editingMode = 'batch';
    @bindable allowedPageSizes = [1, 10, 25, 50, 100];
    @bindable popupTitle;
    @bindable formItemOptions;
    @bindable onOptionChangedFunction;
    @bindable onInitNewRowFunction;
    @bindable onRowInsertedFunction;
    @bindable onRowUpdatedFunction;
    @bindable onRowValidating;
    @bindable onToolbarPreparing;
    @bindable onExporting;
    @bindable onCellPrepared
    @bindable dataSource;
    @bindable onContentReady;
    //Value for storing filters on new accounts/currency/items filters
    @bindable auxFiltersForNewProduct;
    //Values for start and ending dates on toolbars for report.
    @bindable startDateForToolbar;
    @bindable endDateForToolbar;
    @bindable customizeColumns;
    @bindable onEditingStart;
    @bindable onEditorPreparing;
    @bindable closeOnOutsideClick;
    control;
    //Array of editable datetime type fields.
    valuesDateTime = ['validThrough'];
    dataGrid;

    constructor(private router: Router, private eventAggregator: EventAggregator, private sessionService: SessionService) {

    }

    attached() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.dataGrid = new DataGrid(this.control, {
            allowColumnReordering: this.allowColumnReordering || true,
            filterRow: {
                visible: this.filterVisible,
                applyFilter: 'auto'
            },
            headerFilter: {
                visible: this.headerFilterVisible
            },
            searchPanel: {
                visible: this.searchPanelVisible,
                width: 300,
                text: this.searchPanelText
            },
            loadPanel: {
                width: 100
            },
            dataSource: this.items || this.dataSource,
            export: {
                enabled: true
            },
            columnAutoWidth: true,
            rowAlternationEnabled: true,
            remoteOperations: this.items ? false : {
                filtering: true,
                sorting: true,
                paging: true,
                grouping: false,
                summary: false
            },
            scrolling: {
                mode: 'standard',
                showScrollbar: 'always'
            },
            paging: {
                enabled: true,
                pageSize: 25
            },
            stateStoring: {
                enabled: !this.searchPanelText,
                type: 'sessionStorage',
                storageKey: this.storageKey || 'defaultStorageKey'
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: this.allowedPageSizes
            },
            allowColumnResizing: this.allowColumnResizing || true,
            columnResizingMode: this.columnResizingMode || true,
            cellHintEnabled: true,
            showBorders: true,
            showRowLines: false,
            showColumnLines: true,
            columns: this.columns,
            onRowUpdating: this.onRowUpdating,
            onRowPrepared: this.onRowPrepared,
            onRowExpanding: this.onRowExpanding,
            onRowValidating: this.onRowValidating ? (e) => this.onRowValidating(e) : undefined,
            onContentReady: this.onContentReady ? this.onContentReady : (e) => {
                e.element.querySelector('.dx-datagrid-text-content').classList.remove('dx-text-content-alignment-left');
                const countEl = document.getElementById('grid-control-data-count');
                if (this.items && countEl) {
                    countEl.innerText = 'Total Records: ' + this.items?.length;
                } else if (this.dataSource && countEl) {
                    countEl.innerText = 'Total Records: ' + this.dataSource.totalCount();
                }
            },
            onOptionChanged: this.onOptionChangedFunction ? (e) => this.onOptionChangedFunction(e, this.auxFiltersForNewProduct) : undefined,
            onInitNewRow: this.onInitNewRowFunction ? (e) => this.onInitNewRowFunction(e) : undefined,
            onRowInserted: this.onRowInsertedFunction ? (e) => this.onRowInsertedFunction(e, this.auxFiltersForNewProduct) : undefined,
            onRowUpdated: this.onRowUpdatedFunction ? (e) => this.onRowUpdatedFunction(e) : undefined,
            onCellPrepared: this.onCellPrepared ? (e) => this.onCellPrepared(e) : undefined,
            onEditingStart: this.onEditingStart ? (e) => this.onEditingStart(e) : undefined,
            columnChooser: { enabled: this.allowChoosing, mode: 'select' },
            ...this.prepareEditingOptions(),
            masterDetail: {
                enabled: typeof(this.masterDetail) === 'object' ? false : this.masterDetail,
                template: this.masterDetail
            },
        });
    }

    /**
     * Prepares the editing options of the Grid based of the binded elements.
     * @returns the editing object for the Grid.
     */
    prepareEditingOptions() {
        return {
            allowUpdating: this.allowEditing,
            allowAdding: this.allowAdding,
            allowDeleting: this.allowDeleting,
            selectTextOnEditStart: true,
            startEditAction: 'click',
            mode: this.editingMode, // 'batch' | 'cell' | 'form' | 'popup'
            useIcons: true,
            form: {
                colCountByScreen: {
                    xs: 2,
                    sm: 2,
                    md: 3,
                    lg: 4
                },
                items: this.formItemOptions ? [...this.formItemOptions] : undefined
            },
            popup: {
                title: this.popupTitle ? this.popupTitle : 'Edit',
                closeOnOutsideClick: !this.closeOnOutsideClick,
                showTitle: true
            },
            texts: {
                confirmDeleteMessage: this.confirmDeleteMessage || 'Are you sure you want to delete this record? WARNING: This immediately deletes this record.'
            }
        };
    }

    /**
     * Activates a loader and hides the component that trigers
     * @param {Component to hide} data
     * @param {Loader to activate} loaderElement
     */
    startLoader(data, loaderElement) {
        data.component.option('visible', false);
        loaderElement.classList.remove('d-none');
        loaderElement.classList.add('d-block');
    }

    /**
     * deactivates a loader and shows the component that trigers
     * @param {Component to hide} data
     * @param {Loader to activate} loaderElement
     */
    endLoader(data, loaderElement) {
        loaderElement.classList.remove('d-block');
        loaderElement.classList.add('d-none');
        data.component.option('visible', true);
    }

    onRowExpanding = (e) => {
        e.component.collapseAll(-1);
    };
}

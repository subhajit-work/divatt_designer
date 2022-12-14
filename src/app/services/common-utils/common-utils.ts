import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { take, map, tap, delay, switchMap, catchError  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { PaginationService } from '../pagination.service';


/* tslint:disable */ 
@Injectable({
    providedIn: 'root'
})
export class CommonUtils {
    
    constructor( 
        private http : HttpClient,
        // private pagerService : PaginationService,
    ) { }

    // cart list get 
    private _cartListCheck = new BehaviorSubject([]);
    get onChangeCartList(){
        return this._cartListCheck.asObservable();
    }
    getCartDataService(data:any){
        this._cartListCheck.next(data);
    }

    //----------- signin check start ------------
        private _signinUserInfo = new BehaviorSubject(null);

        get signinUserInfoObservable(){
            return this._signinUserInfo.asObservable();
        }

        onSigninUserInfo(data:any){
            console.log('data<<<>>>',data);
            
            this._signinUserInfo.next(data);
        }
    // signin check end

    //----------- signin check start ------------
        private _signinCheck = new BehaviorSubject(null);

        get signinCheckObservable(){
            return this._signinCheck.asObservable();
        }

        onClicksigninCheck(data:any){
            this._signinCheck.next(data);
        }
    // signin check end

    //----------- order info check start ------------
        private _orderInfo = new BehaviorSubject(null);

        get orderInfoObservable(){
            return this._orderInfo.asObservable();
        }

        onClickOrderInfo(data:any){
            this._orderInfo.next(data);
        }
    // order info check end

    //----------- group login click identifire data get start ------------
        private _groupLoginClickableIdentifire = new BehaviorSubject(null);

        get groupLoginIdentifireObservable(){
            return this._groupLoginClickableIdentifire.asObservable();
        }

        onClickGroupIdentifire(data:any){
            this._groupLoginClickableIdentifire.next(data);
        }
    // group login click identifire data get  end

    //----------- group login data get start ------------
        private _groupLoginClickableData = new BehaviorSubject(null);

        get groupLoginClickDataObservable(){
            return this._groupLoginClickableData.asObservable();
        }

        onClickGroupItemData(data:any){
            this._groupLoginClickableData.next(data);
        }
    // group login data get  end

    //----------- site inforamation  start ------------
        private _siteInfoCheck = new BehaviorSubject(null);

        get getSiteInfoObservable(){
            return this._siteInfoCheck.asObservable();
        }

        setSiteInfo(type:any){
            // console.log('setSiteInfo SERVICE >>>>>>>>',type);
            this._siteInfoCheck.next(type);
        }
    // site inforamation  end

    //----------- user type start ------------
    private _userTypeCheck = new BehaviorSubject(null);

        get getUserTypeObservable(){
            return this._userTypeCheck.asObservable();
        }

        setUserType(type:any){
            this._userTypeCheck.next(type);
        }
    // user type end

    //--------- common header/footre/variable data fetch start ---------------
        private _commondata = new BehaviorSubject([]);

        get commonDataobservable(){
            return this._commondata.asObservable();
        }

        getCommonDataService(path:any){
            this._commondata.next(path);
        }
    // common header/footre/variable data fetch end

    //--------- menu permission fetch start ---------------
        private _menuPermission = new BehaviorSubject([]);
        get menuPermissionObservable(){
            return this._menuPermission.asObservable();
        }
        menuPermissionService(data:any){
            this._menuPermission.next(data);
        }
    // menu permission fetch end

    //----------- footer start ------------
        private _footerData = new BehaviorSubject(null);

        get getFooterDataObservable(){
            return this._footerData.asObservable();
        }

        setFooterData(_data:any){
            this._footerData.next(_data);
        }
    // footer data end

    // -----get url name all component start----
        private _pagepathName = new BehaviorSubject(null);

        get pagePathNameAnywhereObsv(){
            return this._pagepathName.asObservable();
        }

        getPathNameFun(path:any){
            this._pagepathName.next(path);
        }

        /* return this.http.post<{name:string}>('https://...json',{ 
            value, 
            id:null 
            })

            .pipe(
            switchMap(resData => {
                console.log('resData *********** 1111111111 >', this.tickets);
                generateId = resData.name; //id set
                return this.tickets;
            }),

            take(1),
            
            tap(ticketss => {
                console.log('resData *********** 222222222 >', this.tickets);
                // console.log('ticketss *********** >', ticketss);
                value.id = generateId; //id get
                this._tickets.next(ticketss.concat(value));
                // ticketss.push(value);
            })
        ) */
    // -----get url name all component end----

    // ----add and remove item (+ -) start-----
        //Add more functions
        addToItem = function( items:any ) {
            items.push({});
        };

        //Remove more functions
	    removeToItem= function(index:any, event:any, items:any, action:any, isDefault:any) {
	        event.preventDefault();
	        if(items.length == 1 && isDefault && action == 'edit')
	        return;
	    	//items remove
	        items.splice( index, 1 );
	    };
    // add and remove item (+ -)end


    // ================= display page record start =========================
        displayRecord = '9';
        displayRecords = [
            { id : '1', displayValue: '10'},
            { id : '2', displayValue: '25'},
            { id : '3', displayValue: '50'},
            { id : '4', displayValue: '100'},
            { id : '5', displayValue: '200'}
        ];
    // display page record end

    //==========================  table header data start ======================
        items_header_data:any; //variable declar
        tableHeaderData:any;
        tableheaderDropdownChecked:any;
        tableHeaderDataDropdown:any;

        private _itemsHeader = new BehaviorSubject(
            []
        );

        get itemsHeaderData(){
            // return [...this._itemsHeader];
            return this._itemsHeader.asObservable();
        }

        headerListData( _getUrl:any ) : Observable<any>{

            this.items_header_data = []; //blank array items will be push

            // table header column selection
            this.tableHeaderData = [];
            this.tableheaderDropdownChecked = [];

            return this.http.get(`${_getUrl}`).pipe(
                map((resData:any) => {
                    if(resData.return_status > 0 && resData.return_data.length > 0){
                        for (const key in resData.return_data) {
                            if (resData.return_data.hasOwnProperty(key)) {
                            this.items_header_data.push(resData.return_data[key]);
                            }
                        }
                    }else{
                    // infinite scroll complite
                    // event.target.complete();
                    }

                    // ---- array filter by display and default array item start ---
                    this.items_header_data.forEach((val:any, ind:any) => {
                        // dropdown show item
                        if(val.is_display == 1){
                            if (this.tableHeaderData.indexOf(val.column_name) === -1) {
                            this.tableHeaderData.push(val);
                            }
                        }
            
                        // dropdown checked item
                        if(val.is_default == 1){
                            if (this.tableheaderDropdownChecked.indexOf(val.column_name) === -1) {
                            this.tableheaderDropdownChecked.push(val);
                            }
                        }
                    });

                    // copy array header data to new array
                    this.tableHeaderDataDropdown = this.tableHeaderData.map((item: any) => item);
                    // array filter by display and default array item end

                    return [this.tableHeaderData, this.tableheaderDropdownChecked, this.tableHeaderDataDropdown];
                }),
                tap(itmArry => {
                    // console.log('itmArry >>>>>>>>>>', itmArry);
                    this._itemsHeader.next(itmArry[0]); //update observable data
                }) 
            );
        }
    // table header data end

    //========================== table listing data start ======================
        items_data:any; //variable declar
        listAllResData:any; //listing page all data
        // pager object
        pager: any = {};
        // paged items
        pageItems: any[] = [];

        private _items = new BehaviorSubject(
            []
        );

        get itemsData(){
            // return [...this._items];
            return this._items.asObservable();
        }

    //     //(api_url, display_record, page, apiParms, search, advanceSearch, identifire)
    //     fetchList( _getUrl:any , _per_page_showItem:any, _page:any, _api_parms:any, _search:any, _advanceSearch:any, _identifire:any) : Observable<any>{
                        
    //         let apiParameters = '';
    //         let advanceSearchParams = '';
    //         let onlySearch;

    //         // search
    //         if(_search === undefined || _search === null ||  _search == '' ){
    //             onlySearch = '';
    //         }else{
    //             onlySearch = _search;

    //         }

    //         // advance search
    //         let formData = new FormData();
    //         let other_data = _advanceSearch;
    //         if(other_data !== undefined && other_data !== null &&  other_data !== ''){
    //             for(var item in other_data){
    //                 if(other_data[item] == undefined){
    //                     other_data[item] = '';
    //                 }
    //                 advanceSearchParams = advanceSearchParams + '&'+item+'='+other_data[item];
                    
    //             }
    //         }

    //         // api parameters
    //         let other_data_parms = _api_parms;
    //         if(other_data_parms !== undefined && other_data_parms !== null &&  other_data_parms !== ''){
    //             for(var itemP in other_data_parms){
    //                 if(other_data_parms[itemP] == undefined){
    //                     other_data_parms[itemP] = '';
    //                 }
    //                 apiParameters = apiParameters + '&'+itemP+'='+other_data_parms[itemP];
                    
    //             }
    //         }


    //         this.items_data = []; //blank array items will be push

    //         return this.http.get(`${_getUrl}?per_page=${_per_page_showItem}&page=${_page}${apiParameters}&search=${_search}${advanceSearchParams}`).pipe(
    //             map((resData:any) => {

    //                 this.items_data = [];
    //                 // console.log('listing link call .................resData =>', resData);

    //                 if(resData.return_status > 0 && resData.return_data.data.length > 0){
    //                     for (const key in resData.return_data.data) {
    //                         if (resData.return_data.data.hasOwnProperty(key)) {
    //                         this.items_data.push(resData.return_data.data[key]);
    //                         }
    //                     }

    //                     this.listAllResData = resData.return_data;
    //                     // console.log('listing common serveice aaaaaaaaaaaaaa >>>>>', resData.return_data);
                        
    //                 }
                    
    //                 // console.log('listing common serveice 111 >>>>>', resData.return_data);

    //                 if(resData.return_status > 0 && resData.return_data.total == '0'){
    //                     // console.log('listing common serveice bbbbbbbbbbbbb >>>>>', resData.return_data);
    //                     this.listAllResData = resData.return_data;
    //                 }

    //                 if(resData.return_status > 0){
    //                     return [this.items_data, this.listAllResData];
    //                 }
    //             }),
    //             tap(itmArry => {
    //                 // console.log('itmArry >----------------------->', itmArry);
    //                 if(itmArry){
    //                     // this._items.next(itmArry);
    //                     this._items.complete();

    //                 }
    //                 // this._items.complete();
    //             }) 
    //         );
    //     }
    // //  table listing data end

    // click edit item update start
    clickEditData:any;
    clickEditDataFun(_data:any){
        this.clickEditData = _data;
        console.log("_data.principle >", _data.principle);
    }
    // click edit item update end
    
    // ===================== getlist data Fetch start ===================
        private _getList = new BehaviorSubject(
            []
        );

        get getListData(){
            // return [...this._getList];
            return this._getList.asObservable();
        }

        getlistCommon(_getUrl:any){
            return this.http.get(`${_getUrl}`).pipe(
                map((resData:any) => {
                    if(resData.return_status > 0){
                        return resData.return_data;
                    }
                }),
                tap(itmArry => {
                this._getList.next(itmArry);
                }) 
            );
        }
    // getlist data Fetch end

    // ===================== select checkbox get value start ===================
        onCheckboxSelectCommon(option:any, event:any, _getItemsArry:any, _allselectModel:any, _itemcheckClick:any, _checkedList:any) {
            if (event.target.checked) {
                if (_checkedList.indexOf(option.id) === -1) {
                _checkedList.push(option.id);
                }
            } else {
                for (let i = 0 ; i < _getItemsArry.length; i++) {
                    if (_checkedList[i] == option.id) {
                        _checkedList.splice(i, 1);
                    }
                }
            }
        
            if (_getItemsArry.length <= _checkedList.length) {
                _allselectModel = true;
            console.log('length 4');
            } else {
                console.log('length 0');
                _allselectModel = false;
                _itemcheckClick = true;
        
            }
            return [_checkedList, _allselectModel];
            // console.log('checked item >>', this.checkedList);
        }
    // select checkbog get value end

    // =================all checkbox value selected start====================
        allSelectItemCommon(event:any, _getItemsArry:any, _itemcheckClick:any, _checkedList:any) {

            if (event.target.checked) {
                _itemcheckClick = false;
                // console.log('check item selkectedddddddddddddd');
                for (let i = 0 ; i < _getItemsArry.length; i++) {
                // if(this.checkedList.includes(this.items[i].id) === false)
                if (_checkedList.indexOf(_getItemsArry[i].id) === -1 && _getItemsArry[i].id !== null) {
                    _checkedList.push(_getItemsArry[i].id);
                    _getItemsArry[i].isSelected = true;

                }
                }
            } else if (_itemcheckClick == false) {
                // console.log('not check item selectionnnnnnnnnnn')
                _checkedList = [];
                for (let i = 0 ; i < _getItemsArry.length; i++) {
                if (_checkedList.indexOf(_getItemsArry[i].id) === -1)
                {
                    _getItemsArry[i].isSelected = false;

                }
                }
            }
            return _checkedList;
            // console.log('checked item @@ >>', _checkedList);
        }
    // all checkbox value select end
}



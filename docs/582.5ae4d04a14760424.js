"use strict";(self.webpackChunkjson_forms=self.webpackChunkjson_forms||[]).push([[582],{6582:(F,D,i)=>{i.r(D),i.d(D,{PlaygroundPageComponent:()=>h});var p=i(38906),u=i(79528),e=i(83090);const v_schema={properties:{comments:{type:"array",items:{type:"object",properties:{name:{type:"string"},message:{type:"string",minLength:10}},required:["name"]}}}},v_uiSchema={type:"VerticalLayout",elements:[{type:"Control",scope:"#/properties/comments",options:{elementLabelProp:"name",detail:{type:"HorizontalLayout",elements:[{type:"Control",label:"",scope:"#/properties/name"},{type:"Control",label:"",scope:"#/properties/message"}]}}}]},I_schema={type:"object",properties:{firstName:{type:"string"},lastName:{type:"string"},comment:{type:"string",description:"Multiline Example"}},required:["comment"]},I_uiSchema={type:"Group",label:"Personal Information",elements:[{type:"Control",scope:"#/properties/firstName",label:"First Name"},{type:"Control",scope:"#/properties/lastName",label:"Last Name"},{type:"Control",scope:"#/properties/comment",label:"Enter comment",options:{multi:!0,minRows:3}}],options:{submitLabel:"Publish comment"}},E_schema={type:"object",properties:{users:{type:"array",items:{type:"object",title:"Users",properties:{firstname:{type:"string"},lastname:{type:"string"},email:{type:"string",format:"email"},age:{type:"number",minimum:0}},required:["firstname"]}}}},E_uiSchema={type:"ListWithDetail",scope:"#/properties/users",options:{detail:{type:"VerticalLayout",elements:[{type:"HorizontalLayout",elements:[{type:"Control",scope:"#/properties/firstname",label:"First Name"},{type:"Control",scope:"#/properties/lastname",label:"Last Name"}]},{type:"Control",scope:"#/properties/age",label:"Age"},{type:"Control",scope:"#/properties/email",label:"Email"}]}}},b_schema={properties:{comments:{type:"array",items:{type:"object",properties:{name:{type:"string"}},required:["name"]}}}},b_uiSchema={type:"VerticalLayout",elements:[{type:"Control",scope:"#/properties/comments"}]},m_schema={type:"object",properties:{name:{type:"string"},dead:{type:"boolean"},kindOfDead:{type:"string",enum:["Zombie","Vampire","Ghoul"]},vegetables:{type:"boolean"},kindOfVegetables:{type:"string",enum:["All","Some","Only potatoes"]},withOther:{type:"string",enum:["She/Her","He/Him","They/Them","Other"]},otherStr:{type:"string"}}},m_uiSchema={type:"VerticalLayout",elements:[{type:"Control",label:"Name",scope:"#/properties/name"},{type:"Group",elements:[{type:"Control",label:"Is Dead?",scope:"#/properties/dead"},{type:"Control",label:"Kind of dead",scope:"#/properties/kindOfDead",rule:{effect:"ENABLE",condition:{scope:"#/properties/dead",schema:{const:!0}}}}]},{type:"Group",elements:[{type:"Control",label:"Eats vegetables?",scope:"#/properties/vegetables"},{type:"Control",label:"Kind of vegetables",scope:"#/properties/kindOfVegetables",rule:{effect:"HIDE",condition:{scope:"#/properties/vegetables",schema:{const:!1}}}}]},{type:"Control",label:"Select pronouns",scope:"#/properties/withOther"},{type:"Control",label:"Type whatever you want",scope:"#/properties/otherStr",rule:{effect:"SHOW",condition:{scope:"#/properties/withOther",schema:{enum:["Other"]}}}}]};var O=i(73364),N=i(38927),S=i(1997),M=i(84341),P=i(60384),n=i(54438),C=i(97529),y=i(55318);const f=()=>({language:"json",theme:"vs-dark"});function z(r,o){if(1&r&&n.nrm(0,"nz-option",3),2&r){const s=o.$implicit;n.Y8G("nzLabel",s.label)("nzValue",s.value)}}function d(r,o){if(1&r){const s=n.RV6();n.j41(0,"jsonforms",6),n.bIt("dataChange",function(a){n.eBV(s);const l=n.XpG();return n.Njj(l.log("dataChange",a))})("submitted",function(a){n.eBV(s);const l=n.XpG();return n.Njj(l.submitted("submitted",a))}),n.mxI("dataChange",function(a){n.eBV(s);const l=n.XpG();return n.DH7(l.formData,a)||(l.formData=a),n.Njj(a)}),n.k0s()}if(2&r){const s=n.XpG();n.R50("data",s.formData),n.Y8G("config",s.jsonformsConfig)("renderers",s.renderers)("schema",s.schema)("submitLoading",s.loading)("uischema",s.uischema)}}let h=(()=>{class r{constructor(){this.renderers=p.KBt,this.schema=u,this.uischema=e,this.schemaCode=JSON.stringify(u,null,2),this.uischemaCode=JSON.stringify(e,null,2),this.formData=null,this.jsonformsConfig=O.U,this.jsonformsConfigCode=JSON.stringify(O.U,null,2),this.options=[{label:"Vertical Layout",value:"default"},{label:"Simple group with submit",value:"group-button"},{label:"Array",value:"array"},{label:"Simple array with one property",value:"item-array"},{label:"List with details",value:"listDetails"},{label:"Rule",value:"rule"}]}log(s,t){console.log("======"+s+"======"),console.log(t),console.log("============")}updateSchema(s){this.schema=null,this.schema=JSON.parse(s)}updateUiSchema(s){this.uischema=null,this.uischema=JSON.parse(s)}selectTemplate(s){switch(s){case"group-button":this.schema=I_schema,this.uischema=I_uiSchema;break;case"array":this.schema=v_schema,this.uischema=v_uiSchema;break;case"item-array":this.schema=b_schema,this.uischema=b_uiSchema;break;case"listDetails":this.schema=E_schema,this.uischema=E_uiSchema;break;case"rule":this.schema=m_schema,this.uischema=m_uiSchema;break;default:this.schema=u,this.uischema=e}this.updateSchemaCode()}updateSchemaCode(){this.schemaCode=JSON.stringify(this.schema,null,2),this.uischemaCode=JSON.stringify(this.uischema,null,2)}submitted(s,t){this.loading=!0,setTimeout(()=>this.loading=!1,1e3),this.log("submitted",t)}updateConfig(s){this.jsonformsConfig=O.U,this.jsonformsConfig=JSON.parse(s)}static#t=this.\u0275fac=function(t){return new(t||r)};static#e=this.\u0275cmp=n.VBU({type:r,selectors:[["app-playground-page"]],standalone:!0,features:[n.aNF],decls:16,vars:10,consts:[["nz-row","","nzGutter","20"],["nz-col","","nzSpan","12"],["ngModel","demo","nzPlaceHolder","Use demo template",3,"ngModelChange"],[3,"nzLabel","nzValue"],[1,"editor",3,"ngModelChange","ngModel","nzEditorOption"],[3,"data","config","renderers","schema","submitLoading","uischema"],[3,"dataChange","submitted","data","config","renderers","schema","submitLoading","uischema"]],template:function(t,a){1&t&&(n.j41(0,"div",0)(1,"div",1)(2,"nz-select",2),n.bIt("ngModelChange",function(c){return a.selectTemplate(c)}),n.Z7z(3,z,1,2,"nz-option",3,n.fX1),n.k0s(),n.j41(5,"h2"),n.EFF(6,"Schema editor"),n.k0s(),n.j41(7,"nz-code-editor",4),n.bIt("ngModelChange",function(c){return a.updateSchema(c)}),n.k0s(),n.j41(8,"h2"),n.EFF(9,"UI Schema editor"),n.k0s(),n.j41(10,"nz-code-editor",4),n.bIt("ngModelChange",function(c){return a.updateUiSchema(c)}),n.k0s(),n.j41(11,"h2"),n.EFF(12,"Config editor"),n.k0s(),n.j41(13,"nz-code-editor",4),n.bIt("ngModelChange",function(c){return a.updateConfig(c)}),n.k0s()(),n.j41(14,"div",1),n.DNE(15,d,1,6,"jsonforms",5),n.k0s()()),2&t&&(n.R7$(3),n.Dyx(a.options),n.R7$(4),n.Y8G("ngModel",a.schemaCode)("nzEditorOption",n.lJ4(7,f)),n.R7$(3),n.Y8G("ngModel",a.uischemaCode)("nzEditorOption",n.lJ4(8,f)),n.R7$(3),n.Y8G("ngModel",a.jsonformsConfigCode)("nzEditorOption",n.lJ4(9,f)),n.R7$(2),n.vxM(15,a.schema&&a.uischema?15:-1))},dependencies:[N.PQ,C.Uq,C.e,S.DH,S.ld,S.WI,M.YN,M.BC,M.vS,P.tC,P.sd,p.WZy,y._],styles:["[_nghost-%COMP%]{display:block;padding:24px}nz-select[_ngcontent-%COMP%]{width:100%;margin-bottom:20px}h2[_ngcontent-%COMP%]{margin:0}.editor[_ngcontent-%COMP%]{display:block;width:100%;height:350px;border:2px solid #ccc;margin:1em 0}"]})}return r})()},60384:(F,D,i)=>{i.d(D,{sd:()=>h,tC:()=>r});var p=i(31635),u=i(60177),e=i(54438),x=i(84341),$=i(92771),v=i(84412),R=i(7673),L=i(21413),I=i(84572),A=i(33726),U=i(88141),E=i(96354),g=i(56977),j=i(70152),b=i(5964),T=i(23294),_=i(3451),m=i(70317),O=i(82983),N=i(16042),S=i(36860);function M(o,s){1&o&&(e.j41(0,"div",0),e.nrm(1,"nz-spin"),e.k0s())}function P(o,s){}function n(o,s){if(1&o&&(e.j41(0,"div",1),e.DNE(1,P,0,0,"ng-template",2),e.k0s()),2&o){const t=e.XpG();e.R7$(),e.Y8G("ngTemplateOutlet",t.nzToolkit)}}const C="codeEditor";function y(o){return(...s)=>{o&&o(...s)}}const f=new $.m(1);let z="unload",d=(()=>{class o{constructor(t,a){this.nzConfigService=t,this.firstEditorInitialized=!1,this.option={},this.option$=new v.t(this.option);const l=this.nzConfigService.getConfigForComponent(C);this.document=a,this.config={...l},this.config.monacoEnvironment&&(window.MonacoEnvironment={...this.config.monacoEnvironment}),this.option=this.config.defaultEditorOption||{},this.subscription=this.nzConfigService.getConfigChangeEventForComponent(C).subscribe(()=>{const c=this.nzConfigService.getConfigForComponent(C);c&&this._updateDefaultOption(c.defaultEditorOption)})}ngOnDestroy(){this.subscription.unsubscribe(),this.subscription=null}_updateDefaultOption(t){this.option={...this.option,...t},this.option$.next(this.option),"theme"in t&&t.theme&&monaco.editor.setTheme(t.theme)}requestToInit(){return"LOADED"===z?(this.onInit(),(0,R.of)(this.getLatestOption())):("unload"===z&&(this.config.useStaticLoading&&typeof monaco>"u"?(0,_.R8)("You choose to use static loading but it seems that you forget to config webpack plugin correctly. Please refer to our official websitefor more details about static loading."):this.loadMonacoScript()),f.pipe((0,U.M)(()=>this.onInit()),(0,E.T)(()=>this.getLatestOption())))}loadMonacoScript(){if(this.config.useStaticLoading)return void Promise.resolve().then(()=>this.onLoad());if("loading"===z)return;z="loading";const t=this.config.assetsRoot,a=t?`${t}/vs`:"assets/vs",l=window,c=this.document.createElement("script");c.type="text/javascript",c.src=`${a}/loader.js`;const B=()=>{G(),l.require.config({paths:{vs:a},...this.config.extraConfig}),l.require(["vs/editor/editor.main"],()=>{this.onLoad()})},V=()=>{throw G(),new Error(`${_.H3} cannot load assets of monaco editor from source "${a}".`)},G=()=>{c.removeEventListener("load",B),c.removeEventListener("error",V),this.document.documentElement.removeChild(c)};c.addEventListener("load",B),c.addEventListener("error",V),this.document.documentElement.appendChild(c)}onLoad(){z="LOADED",f.next(!0),f.complete(),y(this.config.onLoad)()}onInit(){this.firstEditorInitialized||(this.firstEditorInitialized=!0,y(this.config.onFirstEditorInit)()),y(this.config.onInit)()}getLatestOption(){return{...this.option}}static#t=this.\u0275fac=function(a){return new(a||o)(e.KVO(N.yx),e.KVO(u.qQ))};static#e=this.\u0275prov=e.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})(),h=(()=>{class o{set nzEditorOption(t){this.editorOption$.next(t)}constructor(t,a,l,c){this.nzCodeEditorService=t,this.ngZone=a,this.platform=c,this.nzEditorMode="normal",this.nzOriginalText="",this.nzLoading=!1,this.nzFullControl=!1,this.nzEditorInitialized=new e.bkB,this.editorOptionCached={},this.destroy$=new L.B,this.resize$=new L.B,this.editorOption$=new v.t({}),this.editorInstance=null,this.value="",this.modelSet=!1,this.onDidChangeContentDisposable=null,this.onChange=B=>{},this.onTouch=()=>{},this.el=l.nativeElement,this.el.classList.add("ant-code-editor")}ngAfterViewInit(){this.platform.isBrowser&&this.nzCodeEditorService.requestToInit().pipe((0,g.Q)(this.destroy$)).subscribe(t=>this.setup(t))}ngOnDestroy(){this.onDidChangeContentDisposable&&(this.onDidChangeContentDisposable.dispose(),this.onDidChangeContentDisposable=null),this.editorInstance&&(this.editorInstance.dispose(),this.editorInstance=null),this.destroy$.next(),this.destroy$.complete()}writeValue(t){this.value=t,this.setValue()}registerOnChange(t){this.onChange=t}registerOnTouched(t){this.onTouch=t}layout(){this.resize$.next()}setup(t){this.ngZone.runOutsideAngular(()=>(0,m.ij)().pipe((0,g.Q)(this.destroy$)).subscribe(()=>{this.editorOptionCached=t,this.registerOptionChanges(),this.initMonacoEditorInstance(),this.registerResizeChange(),this.setValue(),this.nzFullControl||this.setValueEmitter(),this.nzEditorInitialized.observers.length&&this.ngZone.run(()=>this.nzEditorInitialized.emit(this.editorInstance))}))}registerOptionChanges(){(0,I.z)([this.editorOption$,this.nzCodeEditorService.option$]).pipe((0,g.Q)(this.destroy$)).subscribe(([t,a])=>{this.editorOptionCached={...this.editorOptionCached,...a,...t},this.updateOptionToMonaco()})}initMonacoEditorInstance(){this.ngZone.runOutsideAngular(()=>{this.editorInstance="normal"===this.nzEditorMode?monaco.editor.create(this.el,{...this.editorOptionCached}):monaco.editor.createDiffEditor(this.el,{...this.editorOptionCached})})}registerResizeChange(){this.ngZone.runOutsideAngular(()=>{(0,A.R)(window,"resize").pipe((0,j.B)(300),(0,g.Q)(this.destroy$)).subscribe(()=>{this.layout()}),this.resize$.pipe((0,g.Q)(this.destroy$),(0,b.p)(()=>!!this.editorInstance),(0,E.T)(()=>({width:this.el.clientWidth,height:this.el.clientHeight})),(0,T.F)((t,a)=>t.width===a.width&&t.height===a.height),(0,j.B)(50)).subscribe(()=>{this.editorInstance.layout()})})}setValue(){if(this.editorInstance){if(this.nzFullControl&&this.value)return void(0,_.R8)("should not set value when you are using full control mode! It would result in ambiguous data flow!");if("normal"===this.nzEditorMode)if(this.modelSet){const t=this.editorInstance.getModel();this.preservePositionAndSelections(()=>t.setValue(this.value))}else this.editorInstance.setModel(monaco.editor.createModel(this.value,this.editorOptionCached.language)),this.modelSet=!0;else if(this.modelSet){const t=this.editorInstance.getModel();this.preservePositionAndSelections(()=>{t.modified.setValue(this.value),t.original.setValue(this.nzOriginalText)})}else{const t=this.editorOptionCached.language;this.editorInstance.setModel({original:monaco.editor.createModel(this.nzOriginalText,t),modified:monaco.editor.createModel(this.value,t)}),this.modelSet=!0}}}preservePositionAndSelections(t){if(!this.editorInstance)return void t();const a=this.editorInstance.getPosition(),l=this.editorInstance.getSelections();t(),a&&this.editorInstance.setPosition(a),l&&this.editorInstance.setSelections(l)}setValueEmitter(){const t="normal"===this.nzEditorMode?this.editorInstance.getModel():this.editorInstance.getModel().modified;this.onDidChangeContentDisposable=t.onDidChangeContent(()=>{this.emitValue(t.getValue())})}emitValue(t){this.value!==t&&(this.value=t,this.ngZone.run(()=>{this.onChange(t)}))}updateOptionToMonaco(){this.editorInstance&&this.editorInstance.updateOptions({...this.editorOptionCached})}static#t=this.\u0275fac=function(a){return new(a||o)(e.rXU(d),e.rXU(e.SKi),e.rXU(e.aKT),e.rXU(S.OD))};static#e=this.\u0275cmp=e.VBU({type:o,selectors:[["nz-code-editor"]],inputs:{nzEditorMode:"nzEditorMode",nzOriginalText:"nzOriginalText",nzLoading:"nzLoading",nzFullControl:"nzFullControl",nzToolkit:"nzToolkit",nzEditorOption:"nzEditorOption"},outputs:{nzEditorInitialized:"nzEditorInitialized"},exportAs:["nzCodeEditor"],standalone:!0,features:[e.Jv_([{provide:x.kq,useExisting:(0,e.Rfq)(()=>o),multi:!0}]),e.aNF],decls:2,vars:2,consts:[[1,"ant-code-editor-loading"],[1,"ant-code-editor-toolkit"],[3,"ngTemplateOutlet"]],template:function(a,l){1&a&&e.DNE(0,M,2,0,"div",0)(1,n,2,1,"div",1),2&a&&(e.vxM(0,l.nzLoading?0:-1),e.R7$(),e.vxM(1,l.nzToolkit?1:-1))},dependencies:[O.a,u.T3],encapsulation:2,changeDetection:0})}return(0,p.Cg)([(0,m.H3)()],o.prototype,"nzLoading",void 0),(0,p.Cg)([(0,m.H3)()],o.prototype,"nzFullControl",void 0),o})(),r=(()=>{class o{static#t=this.\u0275fac=function(a){return new(a||o)};static#e=this.\u0275mod=e.$C({type:o});static#n=this.\u0275inj=e.G2t({imports:[h]})}return o})()},82983:(F,D,i)=>{i.d(D,{a:()=>f});var p=i(31635),u=i(60177),e=i(54438),x=i(21413),$=i(84412),v=i(92771),R=i(41584),L=i(99172),I=i(23294),A=i(25558),U=i(39974),E=i(85343),g=i(54360),j=i(58750),T=i(56977),_=i(16042),m=i(70317),O=i(28203);const N=["*"];function S(d,h){1&d&&(e.j41(0,"span",3),e.nrm(1,"i",4)(2,"i",4)(3,"i",4)(4,"i",4),e.k0s())}function M(d,h){}function P(d,h){if(1&d&&(e.j41(0,"div",8),e.EFF(1),e.k0s()),2&d){const r=e.XpG(2);e.R7$(),e.JRh(r.nzTip)}}function n(d,h){if(1&d&&(e.j41(0,"div")(1,"div",5),e.DNE(2,M,0,0,"ng-template",6)(3,P,2,1,"div",7),e.k0s()()),2&d){const r=e.XpG(),o=e.sdS(1);e.R7$(),e.AVh("ant-spin-rtl","rtl"===r.dir)("ant-spin-spinning",r.isLoading)("ant-spin-lg","large"===r.nzSize)("ant-spin-sm","small"===r.nzSize)("ant-spin-show-text",r.nzTip),e.R7$(),e.Y8G("ngTemplateOutlet",r.nzIndicator||o),e.R7$(),e.Y8G("ngIf",r.nzTip)}}function C(d,h){if(1&d&&(e.j41(0,"div",9),e.SdG(1),e.k0s()),2&d){const r=e.XpG();e.AVh("ant-spin-blur",r.isLoading)}}const y="spin";let f=(()=>{class d{constructor(r,o,s){this.nzConfigService=r,this.cdr=o,this.directionality=s,this._nzModuleName=y,this.nzIndicator=null,this.nzSize="default",this.nzTip=null,this.nzDelay=0,this.nzSimple=!1,this.nzSpinning=!0,this.destroy$=new x.B,this.spinning$=new $.t(this.nzSpinning),this.delay$=new v.m(1),this.isLoading=!1,this.dir="ltr"}ngOnInit(){this.delay$.pipe((0,L.Z)(this.nzDelay),(0,I.F)(),(0,A.n)(o=>0===o?this.spinning$:this.spinning$.pipe(function b(d){return(0,U.N)((h,r)=>{let o=!1,s=null,t=null;const a=()=>{if(t?.unsubscribe(),t=null,o){o=!1;const l=s;s=null,r.next(l)}};h.subscribe((0,g._)(r,l=>{t?.unsubscribe(),o=!0,s=l,t=(0,g._)(r,a,E.l),(0,j.Tg)(d(l)).subscribe(t)},()=>{a(),r.complete()},void 0,()=>{s=t=null}))})}(s=>(0,R.O)(s?o:0)))),(0,T.Q)(this.destroy$)).subscribe(o=>{this.isLoading=o,this.cdr.markForCheck()}),this.nzConfigService.getConfigChangeEventForComponent(y).pipe((0,T.Q)(this.destroy$)).subscribe(()=>this.cdr.markForCheck()),this.directionality.change?.pipe((0,T.Q)(this.destroy$)).subscribe(o=>{this.dir=o,this.cdr.detectChanges()}),this.dir=this.directionality.value}ngOnChanges(r){const{nzSpinning:o,nzDelay:s}=r;o&&this.spinning$.next(this.nzSpinning),s&&this.delay$.next(this.nzDelay)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static#t=this.\u0275fac=function(o){return new(o||d)(e.rXU(_.yx),e.rXU(e.gRc),e.rXU(O.dS,8))};static#e=this.\u0275cmp=e.VBU({type:d,selectors:[["nz-spin"]],hostVars:2,hostBindings:function(o,s){2&o&&e.AVh("ant-spin-nested-loading",!s.nzSimple)},inputs:{nzIndicator:"nzIndicator",nzSize:"nzSize",nzTip:"nzTip",nzDelay:"nzDelay",nzSimple:"nzSimple",nzSpinning:"nzSpinning"},exportAs:["nzSpin"],standalone:!0,features:[e.OA$,e.aNF],ngContentSelectors:N,decls:4,vars:2,consts:[["defaultTemplate",""],[4,"ngIf"],["class","ant-spin-container",3,"ant-spin-blur",4,"ngIf"],[1,"ant-spin-dot","ant-spin-dot-spin"],[1,"ant-spin-dot-item"],[1,"ant-spin"],[3,"ngTemplateOutlet"],["class","ant-spin-text",4,"ngIf"],[1,"ant-spin-text"],[1,"ant-spin-container"]],template:function(o,s){1&o&&(e.NAR(),e.DNE(0,S,5,0,"ng-template",null,0,e.C5r)(2,n,4,12,"div",1)(3,C,2,2,"div",2)),2&o&&(e.R7$(2),e.Y8G("ngIf",s.isLoading),e.R7$(),e.Y8G("ngIf",!s.nzSimple))},dependencies:[u.bT,u.T3],encapsulation:2})}return(0,p.Cg)([(0,_.H4)()],d.prototype,"nzIndicator",void 0),(0,p.Cg)([(0,m.YI)()],d.prototype,"nzDelay",void 0),(0,p.Cg)([(0,m.H3)()],d.prototype,"nzSimple",void 0),(0,p.Cg)([(0,m.H3)()],d.prototype,"nzSpinning",void 0),d})()}}]);
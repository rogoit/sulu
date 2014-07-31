define([],function(){"use strict";var a={headline:"contact.accounts.title"},b=["urls","emails","faxes","phones","notes","addresses"],c={tagsId:"#tags",addressAddId:"#address-add",addAddressWrapper:".grid-row"};return{view:!0,layout:{sidebar:{width:"fixed",cssClasses:"sidebar-padding-50"}},templates:["/admin/contact/template/account/form"],customTemplates:{addAddressesIcon:['<div class="grid-row">','    <div class="grid-col-12">','       <span id="address-add" class="fa-plus-circle icon address-add clickable pointer m-left-140"></span>',"   </div>","</div>"].join("")},initialize:function(){this.options=this.sandbox.util.extend(!0,{},a,this.options),this.form="#contact-form",this.saved=!0,this.autoCompleteInstanceName="contacts-",this.dfdListenForChange=this.sandbox.data.deferred(),this.dfdFormIsSet=this.sandbox.data.deferred(),this.instanceNameTypeOverlay="accountCategories",this.accountCategoryURL="api/account/categories",this.contactBySystemURL="api/contacts?bySystem=true",this.render(),this.getAccountTypeData(),this.setHeaderBar(!0),this.listenForChange(),this.options.data&&this.options.data.id&&this.initSidebar("/admin/widget-groups/account-detail?account=",this.options.data.id)},initSidebar:function(a,b){this.sandbox.emit("sulu.sidebar.set-widget",a+b)},getAccountTypeData:function(){this.sandbox.emit("sulu.contacts.account.get.types",function(a,b){this.accountType=a,this.accountTypes=b}.bind(this))},render:function(){var a,b;this.sandbox.once("sulu.contacts.set-defaults",this.setDefaults.bind(this)),this.sandbox.once("sulu.contacts.set-types",this.setTypes.bind(this)),this.html(this.renderTemplate("/admin/contact/template/account/form")),this.titleField=this.$find("#name"),a=this.initContactData(),this.accountType=null,this.accountTypes=null,b=[],this.options.data.id&&b.push({id:this.options.data.id}),this.sandbox.start([{name:"auto-complete@husky",options:{el:"#company",remoteUrl:"/admin/api/accounts?searchFields=name&fields=id,name&flat=true",getParameter:"search",resultKey:"accounts",value:a.parent?a.parent:null,instanceName:"companyAccount"+a.id,valueName:"name",noNewValues:!0,excludes:[{id:a.id,name:a.name}]}}]),this.initForm(a),this.setTags(),this.bindDomEvents(),this.bindCustomEvents(),this.bindTagEvents(a)},setTags:function(){var a=this.sandbox.util.uniqueId();this.options.data.id&&(a+="-"+this.options.data.id),this.autoCompleteInstanceName+=a,this.dfdFormIsSet.then(function(){this.sandbox.start([{name:"auto-complete-list@husky",options:{el:"#tags",instanceName:this.autoCompleteInstanceName,getParameter:"search",itemsKey:"tags",remoteUrl:"/admin/api/tags?flat=true&sortBy=name",completeIcon:"tag",noNewTags:!0}}])}.bind(this))},bindTagEvents:function(a){a.tags&&a.tags.length>0?(this.sandbox.on("husky.auto-complete-list."+this.autoCompleteInstanceName+".initialized",function(){this.sandbox.emit("husky.auto-complete-list."+this.autoCompleteInstanceName+".set-tags",a.tags)}.bind(this)),this.sandbox.on("husky.auto-complete-list."+this.autoCompleteInstanceName+".items-added",function(){this.dfdListenForChange.resolve()}.bind(this))):this.dfdListenForChange.resolve()},initCategorySelect:function(a){this.preselectedCategoryId=a.accountCategory?a.accountCategory.id:null,this.accountCategoryData=null,this.sandbox.util.load(this.accountCategoryURL).then(function(a){var b=a._embedded.accountCategories;this.accountCategoryData=this.copyArrayOfObjects(b),this.sandbox.util.foreach(b,function(a){a.category=this.sandbox.translate(a.category)}.bind(this)),this.addDividerAndActionsForSelect(b),this.sandbox.start([{name:"select@husky",options:{el:"#accountCategory",instanceName:"account-category",multipleSelect:!1,defaultLabel:this.sandbox.translate("contact.accounts.category.select"),valueName:"category",repeatSelect:!1,preSelectedElements:[this.preselectedCategoryId],data:b}}])}.bind(this)).fail(function(a,b){this.sandbox.logger.error(a,b)}.bind(this))},initResponsibleContactSelect:function(a){var b=a.responsiblePerson?a.responsiblePerson.id:null;this.responsiblePersons=null,this.sandbox.util.load(this.contactBySystemURL).then(function(a){this.responsiblePersons=a._embedded.contacts,this.sandbox.start([{name:"select@husky",options:{el:"#responsiblePerson",instanceName:"responsible-person",multipleSelect:!1,defaultLabel:this.sandbox.translate("dropdown.please-choose"),valueName:"fullName",repeatSelect:!1,preSelectedElements:[b],data:this.responsiblePersons}}])}.bind(this)).fail(function(a,b){this.sandbox.logger.error(a,b)}.bind(this))},addDividerAndActionsForSelect:function(a){a.push({divider:!0}),a.push({id:-1,category:this.sandbox.translate("public.edit-entries"),callback:this.showCategoryOverlay.bind(this),updateLabel:!1})},showCategoryOverlay:function(){var a=this.sandbox.dom.$('<div id="overlayContainer"></div>'),b={instanceName:"accountCategories",el:"#overlayContainer",openOnStart:!0,removeOnClose:!0,triggerEl:null,title:this.sandbox.translate("public.edit-entries"),data:this.accountCategoryData,valueName:"category"};this.sandbox.dom.remove("#overlayContainer"),this.sandbox.dom.append(this.$el,a),this.sandbox.emit("sulu.types."+this.instanceNameTypeOverlay+".open",b)},startCategoryOverlay:function(){var a=this.sandbox.dom.createElement("<div/>");this.sandbox.dom.append(this.$el,a),this.sandbox.start([{name:"type-overlay@suluadmin",options:{el:a,overlay:{el:"#overlayContainer",instanceName:"accountCategories",removeOnClose:!0},instanceName:this.instanceNameTypeOverlay,url:this.accountCategoryURL,data:this.accountCategoryData}}])},setDefaults:function(a){this.defaultTypes=a},setTypes:function(a){this.fieldTypes=a},fillFields:function(a,b,c){var d,e=-1,f=a.length;for(b>f&&(f=b);++e<f;)d=e+1>b?{}:{permanent:!0},a[e]?a[e].attributes=d:(a.push(c),a[a.length-1].attributes=d);return a},initContactData:function(){var a=this.options.data;return this.sandbox.util.foreach(b,function(b){a.hasOwnProperty(b)||(a[b]=[])}),this.fillFields(a.urls,1,{id:null,url:"",urlType:this.defaultTypes.urlType}),this.fillFields(a.emails,1,{id:null,email:"",emailType:this.defaultTypes.emailType}),this.fillFields(a.phones,1,{id:null,phone:"",phoneType:this.defaultTypes.phoneType}),this.fillFields(a.faxes,1,{id:null,fax:"",faxType:this.defaultTypes.faxType}),this.fillFields(a.notes,1,{id:null,value:""}),a},initForm:function(a){this.numberOfAddresses=a.addresses.length,this.updateAddressesAddIcon(this.numberOfAddresses),this.sandbox.on("sulu.contact-form.initialized",function(){var b=this.sandbox.form.create(this.form);b.initialized.then(function(){this.setFormData(a),this.initCategorySelect(a),this.initResponsibleContactSelect(a),this.startCategoryOverlay()}.bind(this))}.bind(this)),this.sandbox.start([{name:"contact-form@sulucontact",options:{el:"#contact-edit-form",fieldTypes:this.fieldTypes,defaultTypes:this.defaultTypes}}])},setFormData:function(a){this.sandbox.emit("sulu.contact-form.add-collectionfilters",this.form),this.sandbox.form.setData(this.form,a).then(function(){this.sandbox.start(this.form),this.sandbox.emit("sulu.contact-form.add-required",["email"]),this.sandbox.emit("sulu.contact-form.content-set"),this.dfdFormIsSet.resolve()}.bind(this))},updateHeadline:function(){this.sandbox.emit("sulu.header.set-title",this.sandbox.dom.val(this.titleField))},updateAddressesAddIcon:function(a){var b,d=this.sandbox.dom.find(c.addressAddId);a&&a>0&&0===d.length?(b=this.sandbox.dom.createElement(this.customTemplates.addAddressesIcon),this.sandbox.dom.after(this.sandbox.dom.find("#addresses"),b)):0===a&&d.length>0&&this.sandbox.dom.remove(this.sandbox.dom.closest(d,c.addAddressWrapper))},bindDomEvents:function(){this.sandbox.dom.keypress(this.form,function(a){13===a.which&&(a.preventDefault(),this.submit())}.bind(this))},bindCustomEvents:function(){this.sandbox.on("sulu.contact-form.added.address",function(){this.numberOfAddresses++,this.updateAddressesAddIcon(this.numberOfAddresses)},this),this.sandbox.on("sulu.contact-form.removed.address",function(){this.numberOfAddresses--,this.updateAddressesAddIcon(this.numberOfAddresses)},this),this.sandbox.on("sulu.header.toolbar.delete",function(){this.sandbox.emit("sulu.contacts.account.delete",this.options.data.id)},this),this.sandbox.on("sulu.contacts.accounts.saved",function(a){this.options.data=a,this.initContactData(),this.setFormData(a),this.setHeaderBar(!0)},this),this.sandbox.on("sulu.header.toolbar.save",function(){this.submit()},this),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.contacts.accounts.list")},this),this.sandbox.on("sulu.types."+this.instanceNameTypeOverlay+".closed",function(a){var b=[];this.accountCategoryData=this.copyArrayOfObjects(a),b.push(parseInt(this.selectedAccountCategory?this.selectedAccountCategory:this.preselectedCategoryId,10)),this.addDividerAndActionsForSelect(a),this.sandbox.util.foreach(a,function(a){a.category=this.sandbox.translate(a.category)}.bind(this)),this.sandbox.emit("husky.select.account-category.update",a,b)},this)},copyArrayOfObjects:function(a){var b=[];return this.sandbox.util.foreach(a,function(a){b.push(this.sandbox.util.extend(!0,{},a))}.bind(this)),b},submit:function(){if(this.sandbox.form.validate(this.form)){var a=this.sandbox.form.getData(this.form);""===a.id&&delete a.id,a.tags=this.sandbox.dom.data(this.$find(c.tagsId),"tags"),this.updateHeadline(),a.parent={id:this.sandbox.dom.attr("#company input","data-id")},this.sandbox.emit("sulu.contacts.accounts.save",a)}},setHeaderBar:function(a){if(a!==this.saved){var b=this.options.data&&this.options.data.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a,!0)}this.saved=a},listenForChange:function(){this.dfdListenForChange.then(function(){this.sandbox.dom.on("#contact-form","change",function(){this.setHeaderBar(!1)}.bind(this),"select.changeListener, input.changeListener, textarea.changeListener, .husky-input input .husky-auto-complete input"),this.sandbox.dom.on("#contact-form","keyup",function(){this.setHeaderBar(!1)}.bind(this),"input.changeListener, textarea.changeListener, .husky-input input, .husky-auto-complete input"),this.sandbox.on("sulu.contact-form.changed",function(){this.setHeaderBar(!1)}.bind(this))}.bind(this)),this.sandbox.on("husky.select.account-category.selected.item",function(a){a>0&&(this.selectedAccountCategory=a,this.setHeaderBar(!1))}.bind(this)),this.sandbox.on("husky.select.responsible-person.selected.item",function(a){a>0&&(this.selectedResponsiblePerson=a,this.setHeaderBar(!1))}.bind(this))}}});
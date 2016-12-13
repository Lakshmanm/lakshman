'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'd3': '3ilAppBase01/Web/bower_components/d3/d3.min.js',

        //*** jQuery Plugins
        'chartjs': '3ilAppBase01/Web/bower_components/chartjs/Chart.min.js',
        'ckeditor-plugin': '3ilAppBase01/Web/bower_components/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['3ilAppBase01/Web/bower_components/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['3ilAppBase01/Web/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', '3ilAppBase01/Web/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
        'jquery-appear-plugin': ['3ilAppBase01/Web/bower_components/jquery-appear/build/jquery.appear.min.js'],
        'spectrum-plugin': ['3ilAppBase01/Web/bower_components/spectrum/spectrum.js', '3ilAppBase01/Web/bower_components/spectrum/spectrum.css'],

        //*** Controllers
        /*'dashboardCtrl': '3ilAppBase01/Web/assets/js/controllers/dashboardCtrl.js',
        'iconsCtrl': '3ilAppBase01/Web/assets/js/controllers/iconsCtrl.js',
        'vAccordionCtrl': '3ilAppBase01/Web/assets/js/controllers/vAccordionCtrl.js',
        'ckeditorCtrl': '3ilAppBase01/Web/assets/js/controllers/ckeditorCtrl.js',
        'laddaCtrl': '3ilAppBase01/Web/assets/js/controllers/laddaCtrl.js',
        'ngTableCtrl': '3ilAppBase01/Web/assets/js/controllers/ngTableCtrl.js',
        'cropCtrl': '3ilAppBase01/Web/assets/js/controllers/cropCtrl.js',
        'asideCtrl': '3ilAppBase01/Web/assets/js/controllers/asideCtrl.js',
        'toasterCtrl': '3ilAppBase01/Web/assets/js/controllers/toasterCtrl.js',
        'sweetAlertCtrl': '3ilAppBase01/Web/assets/js/controllers/sweetAlertCtrl.js',
        'mapsCtrl': '3ilAppBase01/Web/assets/js/controllers/mapsCtrl.js',
        'chartsCtrl': '3ilAppBase01/Web/assets/js/controllers/chartsCtrl.js',
        'calendarCtrl': '3ilAppBase01/Web/assets/js/controllers/calendarCtrl.js',
        'nestableCtrl': '3ilAppBase01/Web/assets/js/controllers/nestableCtrl.js',
        'validationCtrl': ['3ilAppBase01/Web/assets/js/controllers/validationCtrl.js'],
        'userCtrl': ['3ilAppBase01/Web/assets/js/controllers/userCtrl.js'],
        'selectCtrl': '3ilAppBase01/Web/assets/js/controllers/selectCtrl.js',
        'wizardCtrl': '3ilAppBase01/Web/assets/js/controllers/wizardCtrl.js',
        'uploadCtrl': '3ilAppBase01/Web/assets/js/controllers/uploadCtrl.js',
        'treeCtrl': '3ilAppBase01/Web/assets/js/controllers/treeCtrl.js',
        'inboxCtrl': '3ilAppBase01/Web/assets/js/controllers/inboxCtrl.js',
        'xeditableCtrl': '3ilAppBase01/Web/assets/js/controllers/xeditableCtrl.js',
        'chatCtrl': '3ilAppBase01/Web/assets/js/controllers/chatCtrl.js',
        'dynamicTableCtrl': '3ilAppBase01/Web/assets/js/controllers/dynamicTableCtrl.js',
        'notificationIconsCtrl': '3ilAppBase01/Web/assets/js/controllers/notificationIconsCtrl.js',
        'dateRangeCtrl': '3ilAppBase01/Web/assets/js/controllers/daterangeCtrl.js',
        'notifyCtrl': '3ilAppBase01/Web/assets/js/controllers/notifyCtrl.js',
        'sliderCtrl': '3ilAppBase01/Web/assets/js/controllers/sliderCtrl.js',
        'knobCtrl': '3ilAppBase01/Web/assets/js/controllers/knobCtrl.js',*/
		 'AppointmentController': '3ilAppBase01/Logic/AppointmentController.js'
    },
    //*** angularJS Modules
    modules: [{
        name: 'toaster',
        files: ['3ilAppBase01/Web/bower_components/AngularJS-Toaster/toaster.js', '3ilAppBase01/Web/bower_components/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['3ilAppBase01/Web/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', '3ilAppBase01/Web/bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'ngTable',
        files: ['3ilAppBase01/Web/bower_components/ng-table/dist/ng-table.min.js', '3ilAppBase01/Web/bower_components/ng-table/dist/ng-table.min.css']
    }, {
        name: 'ui.mask',
        files: ['3ilAppBase01/Web/bower_components/angular-ui-utils/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: ['3ilAppBase01/Web/bower_components/ngImgCrop/compile/minified/ng-img-crop.js', '3ilAppBase01/Web/bower_components/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['3ilAppBase01/Web/bower_components/angular-file-upload/angular-file-upload.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['3ilAppBase01/Web/bower_components/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['3ilAppBase01/Web/bower_components/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'chart.js',
        files: ['../..//3ilAppBase01/Web/bower_components/angular-chart.js/dist/angular-chart.min.js', '../..//3ilAppBase01/Web/bower_components/angular-chart.js/dist/angular-chart.min.css']
    }, {
        name: 'flow',
        files: ['3ilAppBase01/Web/bower_components/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'ckeditor',
        files: ['3ilAppBase01/Web/bower_components/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['3ilAppBase01/Web/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', '3ilAppBase01/Web/bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', '3ilAppBase01/Web/assets/js/config/config-calendar.js']
    }, {
        name: 'ng-nestable',
        files: ['3ilAppBase01/Web/bower_components/ng-nestable/src/angular-nestable.js']
    }, {
        name: 'ngNotify',
        files: ['3ilAppBase01/Web/bower_components/ng-notify/dist/ng-notify.min.js', '3ilAppBase01/Web/bower_components/ng-notify/dist/ng-notify.min.css']
    }, {
        name: 'xeditable',
        files: ['3ilAppBase01/Web/bower_components/angular-xeditable/dist/js/xeditable.min.js', '3ilAppBase01/Web/bower_components/angular-xeditable/dist/css/xeditable.css', '3ilAppBase01/Web/assets/js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['3ilAppBase01/Web/bower_components/checklist-model/checklist-model.js']
    }, {
        name: 'ui.knob',
        files: ['3ilAppBase01/Web/bower_components/ng-knob/dist/ng-knob.min.js']
    }, {
        name: 'ngAppear',
        files: ['3ilAppBase01/Web/bower_components/angular-appear/build/angular-appear.min.js']
    }, {
        name: 'countTo',
        files: ['3ilAppBase01/Web/bower_components/angular-count-to-0.1.1/dist/angular-filter-count-to.min.js']
    }, {
        name: 'angularSpectrumColorpicker',
        files: ['3ilAppBase01/Web/bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js']
    }]
});
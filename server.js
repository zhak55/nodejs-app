
         let Utils = {
           counter : 0,
           to      : Object.prototype.toString ,
           has     : Object.prototype.hasOwnProperty ,
           isArray : function( arr ) {
            if( Array.isArray ) return Array.isArray(arr);
            return  this.to.call(arr) === '[object Array]';
           } ,
           extend  : function(source, target) {
            !target && ( target = {} );
             let key;
             for( key in source ) if ( this.has.call(source, key) ) 
              target[key] = source[key];
             return target;
           }
         };

         let contexLib = class {

           // Initialize main class 
           // @param {Object} container for context
           // @return this 

           constructor() {
             this.$el     = contexLib.CanvasElement.apply(null, arguments);
             this.context = this.$el.getContext("2d")
           }

           // Append each element to canvas 
           // @param {Object} []

           append() {
            let length = arguments.length,  index  = 0;
             if(!length) return;
              for( ; index < length; index++ ) {
               let currentElement = arguments[index].model;
                for( let key in currentElement ) {
                 let $this = currentElement[key]
                  ,  type  = $this.type
                  ,  name   = $this.name;

                  if( type === 'function' ) this.context[name].apply(this.context, $this.args)
                  if( type === 'props'    ) this.context[name] = currentElement[key].value; 
               }
             }
             return this;
           }

           //  Executes a provided function once per array or object element
           //  @param {Object|Array} [object]
           //  @param {Function}     [callback]
           //  @param {Object}       [context]

             static each( object, callback, context ) {
               let keys   = Object.keys( object )
                 , length = keys["length"]
                 , index  = length - 1
                 , temp;
    
              while( length-- ) callback
                .call( context || this, index - length, object[(temp = keys[length])], temp );
             }

             // Create Rect for canvas with props 
             // @param {Object} [object]
             // @return {Object}

             static Rect( object ) { 
               return new _Rect(object);
             }

             // Helps to get or create canvas element 
             // @param  {Object} [object]
             // @param  {String} [selector]
             // @param  {Object} [styles]
             // @return {Object} 

             static CanvasElement( object, selector, styles )  {
              if( typeof selector === 'object' || !selector ) {
                styles = selector;
                selector = 'body'; } 
               let doc     = document
                ,  element = doc.createElement('canvas')
                ,  target  = doc.querySelector( selector );
                if( styles ) Utils.extend(element.style, style);
                Utils.extend(object, element);
                target.appendChild(element);
                return element;
             }
         }

         class Events {
           constructor() {
            this.stack = {};
           }
           on( type, callback ) {
            if(!this.stack[type])
           } 
         }

         class _Rect extends Events  {
           constructor( object ) {
            super();
            this.id    =  'rect-' + Utils.counter++;
            this.model = [{
                  name : 'beginPath', 
                  type : 'function' ,
                  args : []
                 }, { 
                  name :  'rect', 
                  type :  'function', 
                  args : [ 
                    object.x || 0  , 
                    object.y || 0  , 
                    object.width, 
                    object.height 
                   ]
                 } , {
                  name : 'fillStyle', 
                  type : 'props'    , 
                  value: object.background || 'black'     
                 }  , {
                  name : 'fill'     , 
                  type : 'function' ,
                  args :  [] 
                 } , {
                  name : 'lineWidth', 
                  type : 'props'    , 
                  value: object.background || 'black'     
                 } , {
                  name : 'stroke'   , 
                  type : 'function' ,
                  args :  [] 
                 }]
               }
             }

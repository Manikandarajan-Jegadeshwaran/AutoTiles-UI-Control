# [AutoTiles-UI-Control - Plugin for new UI control](https://manikandarajan-jegadeshwaran.github.io/AutoTiles-UI-Control/)
Here the plugin Autotiles-ui-control is a new user interface that can be used to handle the multiple binding of data with highly responsive tiles pattern.

## **Generate new UI control with autotiles**
Check out the image to get an overview of what can be done with this plugin. 

## Themes
![](https://raw.githubusercontent.com/Manikandarajan-Jegadeshwaran/AutoTiles-UI-Control/master/autotile_demo_image.png)

## Install
Download and include [autotiles.js](https://raw.githubusercontent.com/Manikandarajan-Jegadeshwaran/AutoTiles-UI-Control/master/autotiles.js) and [autotiles.css](https://raw.githubusercontent.com/Manikandarajan-Jegadeshwaran/AutoTiles-UI-Control/master/autotiles.css)
```javascript
    <script src="bower_components/autotiles.js"></script>
    <script src="bower_components/autotiles.css"></script>
```
> Download minified version from here [autotiles.min.js](https://github.com/Manikandarajan-Jegadeshwaran/AutoTiles-UI-Control/blob/master/autotiles.min.js) and [autotiles.min.css](https://github.com/Manikandarajan-Jegadeshwaran/AutoTiles-UI-Control/blob/master/autotiles.min.css)

## Usage  
### Design 
Here is the example, how to create div to setup entire plugin data.
```html
    <html>
      <body>
          <div id='divAuto'>
      </body>
    </html>
```
### Invoke
The default way of invoking plugin to initiate plugin functionality. Here `Option` is used to setup additional arguments and it can be detaily explained below.

```javascript
      $(function () {
        var Option = {
            url: '../pluginData.asmx/GetData'  \\here I use webservice to fetch data
        }
        $('#divAuto').autotiles(Option);
    });
```

### Invoke with options
The following are the complete options available for plugin to invoke.
```javascript
       $(function () {
        var Option = {
            url: '../pluginData.asmx/GetData'//
             , arguments: { type: '1' }
             , result: 'hdnResult'
             , theme: 'greeny'
             , validatekey: { key: 'ID' }
             , onloaditem: [{ "Name": "Moving tortoise", "ID": 88, "Code": 88 }]
             , onselect: function (obj) {
                 console.log(obj);
             }
        }
        $('#divAuto').autotiles(Option);
    });
```

###Options
Following are the options used in `autotiles.js` so be sure to check it out if in doubt. All the Options except `url` are handled with default settings, perhaps if the end user leave the options like `arguments, result, theme, ...`.

> `Note - The option url is mandatory`.

#### 1. Url
Used to provide path for the service or location to access source. This option is mandatory.

#### 2. Aruguments
Here we can pass the additional arguments that are required based on requirements to access the source data successfully.

#### 3. Result
This result option is used to set the hidden control ID with provided value. By default `hdnResult` is assigned.

#### 4.Theme
User feels great here. Option like this mainly used for setting themes for the Autotiles control. By default `light` is assigned.

   > Available Themes
   * light
   * greeny
   * flower

#### 5. ValidateKey
This option allow the user to specify the key to validate with the result. By default `ID` is assigned. User can provide the key based on their source data.

#### 6. OnloadItems
This option is main used to pre pop-up the data with out any autocomplete, and it's mainly used to highlight the already selected data while loading the control at second time.

#### 7. OnSelect
This option will trigger the callback function to perform user defined function.


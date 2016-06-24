(function ($) {
    $.fn.autotiles = function (option) {
        var Execute = (function ($) {
            var Data = {
                Default: { theme: 'light', validatekey: { key: 'Name' }, onselect: function () { } },
                Option: {},
                Div: '',
                CreateElement: function ($Div) {
                    $('<input/>', { type: 'text', placeholder: 'search..' }).appendTo($Div);//Create TextBox Contrl Internally
                    $('<input/>', { type: 'hidden', id: Data.Option.result, value: '' }).appendTo($Div); //Create hidden Contrl Internally
                    $('<div/>', { id: 'divChild' }).prependTo($Div);
                },
                SetOptions: function (option) {
                    if (option != undefined) {
                        Data.Option = $.extend({}, Data.Default, option);
                    }
                    //Data.Div.find('input[type=text]').val('');
                },
                Execute: function ($Div, option) {
                    Data.SetOptions(option);
                    Data.CreateElement($Div);
                    Data.Div = $Div;
                    Data.Div.addClass(Data.Option.theme);
                    //AutoComplete Function
                    $Div.find('input:text').autocomplete({
                        source: function (request, response) {
                            var reqData = $.extend({ key: request.term }, Data.Option.arguments);
                            console.log(reqData);
                            $.ajax({
                                url: Data.Option.url,
                                data: JSON.stringify(reqData),
                                dataType: "json",
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    response($.map(data.d, function (Itm) {
                                        return {
                                            label: Itm.Name,
                                            item: Itm
                                        };
                                    }))
                                },
                                failure: function (data) {

                                }
                            });
                        },
                        select: function (i, e) {
                            Data.AddResultData(e, 'new');
                        }
                    });
                    if (Data.Option.onloaditem.length > 0) {
                        Data.AddResultData(Data.Option.onloaditem, 'exist')
                    }
                },
                AddResultData: function (data, type) {
                    var ResultData = (function ($) {
                        var privateData = {
                            Hdn: $('#' + Data.Option.result),
                            FoundData: [],
                            HdnValue: $('#' + Data.Option.result).val(),
                            Duplicate: 0,
                            GetExitsData: function () {
                                if (Check.Notempty(privateData.HdnValue)) {
                                    $.each(Utilities.ParseIt(privateData.HdnValue), function (Idx, Itm) {
                                        privateData.FoundData.push(Itm);
                                    });
                                }
                            },
                            CheckDuplicate: function () {
                                if (Check.Notzero(privateData.FoundData)) {
                                    $.each(privateData.FoundData, function (Idx, Itm) {
                                        var key = Data.Option.validatekey.key;
                                        if (Itm[key] == data.item.item[key]) {
                                            privateData.Duplicate++;
                                        }
                                    });
                                }
                            },
                            IsExists: function (data) {
                                privateData.GetExitsData();
                                privateData.CheckDuplicate();
                                privateData.AddData(privateData.Duplicate, data);
                                if (privateData.Duplicate == 0) return Data.Option.onselect(data);
                            },
                            AddData: function (duplicate, data) {
                                if (duplicate == 0) {
                                    if (data.item != undefined) {
                                        privateData.FoundData.push(data.item.item);
                                    } else {
                                        privateData.FoundData = data;
                                    }
                                    if (Check.Notzero(privateData.FoundData)) {
                                        privateData.Hdn.val('');
                                        privateData.Hdn.val(Utilities.StringIt(privateData.FoundData));
                                        privateData.CreateElement();
                                    }

                                }
                                else {
                                    alert("Alreay Exists");
                                    console.log('Entered data already present in Existing collection. please refer - ' + Data.Option.result);
                                }
                            },
                            CreateElement: function () {
                                if (Check.Notzero(privateData.FoundData)) {
                                    Data.Div.find('#divChild').children().detach();
                                    $.each(privateData.FoundData, function (Idx, Itm) {
                                        $('<div/>').append($('<span/>').text(Itm.Name)).append($('<span/>', { 'onclick': 'on.click(this)' }).text('x').data({ 'item': Itm, 'key': Data.Option.validatekey.key, 'source': Data.Option.result })).appendTo($('#divChild'));
                                    });
                                }
                            }
                        }
                        return {
                            Add: privateData.IsExists,
                            AddExist: privateData.AddData
                        }
                    }(jQuery))
                    if (type == 'new') { ResultData.Add(data); }
                    if (type == 'exist') { ResultData.AddExist(0, data); } //no dulicate comparison needed, so put '0' for first argument
                }
            }
            return {
                ExecuteAutofill: Data.Execute
            }
        }(jQuery))
        , Check = (function ($) {
            var Data = {
                Check_Not_null: function (d) { return d != null ? true : false; }
               , Check_Not_empty: function (d) { return d != '' ? true : false; }
               , Check_Not_undefined: function (d) { return d != undefined ? true : false; }
               , Check_Not_zero: function (d) { return d.length > 0 ? true : false; }
               , Valid: function (d) { return check.Notnull(d) && check.Notempty(d) && check.Notundefined(d) && check.Notzero(d) ? true : false; }
            }
            return {
                Notnull: Data.Check_Not_null
               , Notempty: Data.Check_Not_empty
               , Notundefined: Data.Check_Not_undefined
               , Notzero: Data.Check_Not_zero
               , Isvalid: Data.Valid
            }
        }(jQuery))
        , Utilities = (function ($) {
            var Convert = {
                ToParse: function (d) {
                    return JSON.parse(d);
                },
                ToStringify: function (d) {
                    return JSON.stringify(d);
                }
            }
            return {
                ParseIt: Convert.ToParse,
                StringIt: Convert.ToStringify
            }
        }(jQuery))
        Execute.ExecuteAutofill(this, option);
        $('.ui-helper-hidden-accessible').hide();
    };
})(jQuery)
var on = {
    click: function (e) {
        var HdnID = $(e).data('source')
           , key = $(e).data('key')
           , Item = $(e).data('item')
           , FoundData = JSON.parse($('#' + HdnID).val())
           , temp = [];
        $('#' + HdnID).val('');
        temp = $.grep(FoundData, function (Itm) {
            return Itm[key] != Item[key];
        });
        if (temp.length > 0) {
            $('#' + HdnID).val(JSON.stringify(temp));
        }
        $(e).parent().detach();
    }
};



(function( $, window, document, undefined ) {
    $(document).ready(function() {
        var $select_line = null;
        var keys = [1,2,4];
        var foldedrow = {};
        /* identify two row is the same type or not */
        var isSameType = function(left, right) {
          var i;
          if(left == [] || right == [])
            return false;
          for(i in keys) {
            if(left[keys[i]] != right[keys[i]]){
              return false;
            }
          }
          return true;
        }
        
        /* generate a type key for storing the array */
        var genKey = function(data) {
          if(typeof data === 'undefined')
            return 'undefined';
          var i;
          var ss = '';
          for(i in keys){
            ss += data[keys[i]];
          }
          return ss;
        }
        
        /* set all row folded */
        var initunfoldedflags  = function(data) {
          var i;
          for(i in data) {
            var tkey = genKey(data[i]);
            if(!(tkey in foldedrow)) {
              foldedrow[tkey] = 1;
            }
          }
        }
        
        /* process the original data, move the same type arrays to hidden data and return the unique data */
        var compressData = function(json){
          if (typeof rss.hiddendata === 'undefined') {
            rss.hiddendata = {};
          } else {
            rss.hiddendata = {};
          }
          var data = json.aaData;
          var i;
          var j = 0;
          var pdata = [];
          var prerow = [];
          for(i in data) {
            if(isSameType(prerow, data[i])) {
              var tkey = genKey(data[i]);
              if(tkey in rss.hiddendata) {
                var len = rss.hiddendata[tkey].length;
                rss.hiddendata[tkey][len] = data[i];
              } else {
                rss.hiddendata[tkey] = [];
                rss.hiddendata[tkey][0] = data[i];
              }
            } else {
              pdata[j++] = data[i];
            }
            prerow = data[i];
          }
          initunfoldedflags(pdata);
          return pdata;
        };
        
        /* add the prefix and postfix to construct a row in table */
        var makerow = function(data) {
          var i;
          var ss = "<tr>";
          for(i in data) {
            ss += "<td>" + data[i] + "</td>";
          }
          ss += "</tr>";
          return ss;
        }
        
        /* remove a couple of rows according hash key */
        var removeData = function($table, hashkey) {
          var j, c = 0;
          var cRow = [];
          var cKey;
          $table.find('tr').each(function(){
            j = 0;
            $(this).find('td').each(function(){
              cRow[j++] = $(this).text();
            });
            cKey = genKey(cRow);
            if(cKey == hashkey) {
              if(c == 0) {
                c = 1;
              } else {
                $(this).remove();
              }
            }
          });
        }
        
        /* add a couple of rows to proper place according hash key */
        var addData = function(Data, $cur, hashkey) {
          var i, k;
          var ckey;
          for(i in Data) {
            ckey = genKey(Data[i]);
            if(ckey == hashkey) {
              // if it exist several rows in hidden data
              if(ckey in rss.hiddendata) {
                for(k in rss.hiddendata[ckey]) {
                  $cur.after(makerow(rss.hiddendata[ckey][k]));
                  $cur = $cur.closest('tr').next('tr');
                }
              }
            }
          }
        }
        
        var quoteTable = $("#quoteinfo").dataTable({
            "iDisplayLength": 10,
            "aLengthMenu": [[10, 15, 20], [10, 15, 20]],
            "sPaginationType": "full_numbers",
            "bAutoWidth": false,
            //"sScrollX": "100%",
            "bDeferRender": true,
            "bProcessing": true,
            //"sScrollXInner": "100%",
            "sDom": 'T<"top"f>rt<"dataTable-pages"lpi><"clear">',
            "bServerSide": true,
            "sAjaxSource": "/asset/quoteinfo/ajax_getdata/",
            "fnServerData":function(sSource, aoData, fnCallback){
                $.getJSON(sSource, aoData, function (json) {
                    $select_line = null;
                    json.aaData = compressData(json);
                    fnCallback(json);
                });  
            },
            "aoColumns": [
                { "bSearchable": false},
                { "bSearchable": true},
                { "bSearchable": true},
                { "bSearchable": true},
                { "bSearchable": true},
                { "bSearchable": false},
                { "bSearchable": false},
                { "bSearchable": false},
                { "bSearchable": false}

            ],
            "oTableTools":{
                "sRowSelect": "single",         
                "fnRowSelected":function(node){
                    $select_line = $(node).children();
                },
                "aButtons":[]
            }
        });
        
        quoteTable.on( 'click', 'tr', function () {
          // get the selected data
          var selectedData = [];
          var i = 0;
          $(this).find('td').each(function() {
            selectedData[i++] = $(this).text();
          });
          var hashkey = genKey(selectedData);
          var cData = quoteTable.fnGetData();
          var $table = $(this).parents('table');
          // if the data has been folded
          if(foldedrow[hashkey] == 1) {
            // unfold the row and set flag 
            console.log("unfold the row");
            addData(cData, $(this), hashkey);
            foldedrow[hashkey] = 0;
           
          } else {
            // flod the row and set flag    
            console.log("fold the row");
            removeData($table,hashkey);
            foldedrow[hashkey] = 1;
          }
        });
        
        var addfilter = "<div class='pull-right'><a href='#' class='btn btn-primary btn-xs margin-left' id='add_btn'>New</a>";
            addfilter += "<a href='#' class='btn btn-primary btn-xs margin-left' id='edit_btn'>Edit</a>";
            addfilter += "<a href='#' class='btn btn-primary btn-xs margin-left' id='delete_btn'>Delete</a></div>";
                
        $('#quoteinfo_filter');
        $(addfilter).appendTo('#quoteinfo_filter');
        
        
        $("#delete_btn").bind("click", function (event) {
            event.preventDefault();
            if($select_line == null){
                rss.alert.noRowSelected();
            }else{
                $('#delete_quoteinfo_id').val($($select_line[0]).text());
                $("#delete-quoteinfo-dialog").dialog("open");
            }
        });
        
        
        $("#edit_btn").bind("click", function (event) {
            event.preventDefault();
            if($select_line == null){
                rss.alert.noRowSelected();
            }else{
                console.log($select_line);
                $('#edit_quoteinfo_id').val($($select_line[0]).text());
                $('#exchange_id').val($($select_line[1]).text());
                $('#item_id').val($($select_line[2]).text());
                $('#contract').val($($select_line[3]).text());
                $('#name_id').val($($select_line[4]).text());
                $('#fee_id').val($($select_line[5]).text());
                $('#stable_id').val($($select_line[6]).text());
                $('#scale_id').val($($select_line[7]).text());
                $('#multip_id').val($($select_line[8]).text());
                $("#edit-quoteinfo-dialog").dialog("open");
            }
        });
        
        
        $("#add_btn").bind("click", function (event) {
            event.preventDefault();
            $("#add-quoteinfo-dialog").dialog("open");
        });


    });

}) (jQuery, window, document);

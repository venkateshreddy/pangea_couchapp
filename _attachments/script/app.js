// Apache 2.0 J Chris Anderson 2011
$(function() {   
    // friendly helper http://tinyurl.com/6aow6yn
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    var path = unescape(document.location.pathname).split('/'),
        design = path[3],
        db = $.couch.db(path[1]);
    /*function drawItems() {
        db.view(design + "/recent-items", {
            descending : "true",
            limit : 50,
            update_seq : true,
            success : function(data) {
                setupChanges(data.update_seq);
                var them = $.mustache($("#recent-messages").html(), {
                    items : data.rows.map(function(r) {return r.value;})
                });
                $("#content").html(them);
            }
        });
    };*/
    var items_limit = 100;
    var items_skip = 0;
    var total_rows_count = 0;
    function drawItems(skip , limit) {
        //console.log(design);
        $("#loading_img").css("visibility","visible");
        db.view(design + "/recent-items", {
            descending : "true",
            limit : limit,
            skip : skip,
            update_seq : true,
            success : function(data) {
                //setupChanges(data.update_seq);
                total_rows_count = data.total_rows;
                fetched_rows_count = data.rows.length;
                $("#counter").text(fetched_rows_count+" results");
                var them = $.mustache($("#recent-messages").html(), {
                    items : data.rows.map(function(r) {return r.value;})
                });
                $("#content").html(them);
                $("#loading_img").css("visibility","hidden");
            }
        });
    };
    drawItems(items_skip, items_limit);
    var changesRunning = false;
    function setupChanges(since) {
        if (!changesRunning) {
            var changeHandler = db.changes(since);
            changesRunning = true;
            changeHandler.onChange(drawItems(items_skip, items_limit));
        }
    }
    $("#documents_count").change(function(){
        var count = $(this).val();
        drawItems(items_skip, count);
    });
    var search_token = "";
    var method_name = "";
    var request_type = "";
    var account_id = "";
    var data_temp = "";
    $("#search_token").keyup(function(){
        search_token = $(this).val();
        filterDocuments();
    });
    $("#method_name").keyup(function(){
        method_name = $(this).val();
        filterDocuments();
    });
    $("#account_id").keyup(function(){
        account_id = $(this).val();
        filterDocuments();
    });
    $("#data_temp").keyup(function(){
        data_temp = $(this).val();
        filterDocuments();
    });
    
    $("#request_type").change(function(){
        request_type = $(this).val();
        filterDocuments();
    });
    function filterDocuments(){
        var counter_temp = 0;
        $("#items li").each(function(){
            var classname = $(this).attr('class');
            var i_d = $(this).attr('id');
            var name = $(this).attr('name');
            var doc_data  = $(this).children("p").text();
            if(name.indexOf(account_id) >= 0 && 
                classname.indexOf(method_name) >= 0 && 
                classname.indexOf(request_type) >= 0 && 
                i_d.indexOf(search_token) >= 0 &&
                doc_data.indexOf(data_temp) >= 0
            )
            {
               $(this).show(); 
               counter_temp++;
            }
            else{
                $(this).hide();
            }
        });
        $("#counter").text(counter_temp+" results");
    }
    $.couchProfile.templates.profileReady = $("#new-message").html();
    $("#account").couchLogin({
        loggedIn : function(r) {
            $("#profile").couchProfile(r, {
                profileReady : function(profile) {
                    $("#create-message").submit(function(e){
                        e.preventDefault();
                        var form = this, doc = $(form).serializeObject();
                        doc.created_at = new Date();
                        doc.profile = profile;
                        db.saveDoc(doc, {success : function() {form.reset();}});
                        return false;
                    }).find("input").focus();
                }
            });
        },
        loggedOut : function() {
            $("#profile").html('<p>Please log in to see your profile.</p>');
        }
    });
 });
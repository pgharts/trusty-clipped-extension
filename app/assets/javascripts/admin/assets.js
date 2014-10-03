Assets = {
  attachEvents: function() {
    $('a.attach_asset').click(function(e){
      e.preventDefault();
      var link = $(this);
      var container = link.parents('li.asset');
      var title = link.parents('div.title').html();
      var image = link.parents('img');
      container.addClass('waiting');
      $.ajax({
        url: link.attr('href'),
        success: function(data, textStatus, jqXHR) {
          container.removeClass('waiting');
          Assets.addToList(data);
        }
      });
    });

    $('a.detach_asset').click(function(e){
      e.preventDefault();
      var link = $(this);
      Assets.removeFromList(link.parents('li.asset'));
    });

    $('a.insert_asset').click(function(e){
      e.preventDefault();
      var part_name = $("a.tab.here").children('span').html();
      if (part_name.indexOf(' ')) part_name = part_name.replace(' ', '-');
      var textbox = $('#part_' + part_name + '_content');
      var tag_parts = $(this).attr('rel').split('_');
      var tag_name = tag_parts[0];
      var asset_size = tag_parts[1];
      var asset_id = tag_parts[2];
      var radius_tag = '<r:asset:' + tag_name;
      if (asset_size != '') radius_tag = radius_tag + ' size="' + asset_size + '"';
      radius_tag =  radius_tag +' id="' + asset_id + '" />';
      Assets.insertAtCursor(textbox, radius_tag);
    });

    $(".pagination a").click(function(e){
      e.preventDefault();
      $.ajax({
        method: 'get',
        url: $(this).attr('href') + Assets.assetFilterParameters(),
        complete: function(data, textStatus, jqXHR) {
          Assets.updateTable(data.responseText);
          Assets.attachEvents();
        }
      });
    });

  },

  assetFilterParameters: function() {
    var parameters = [];
    if ($('#filesearchforminput').val() !== '') {
      parameters.push(['search', $('#filesearchforminput').val()]);
    }
    var filters = [];
    var url_params = "";
    $('a.selective.pressed').each(function(){
      filters.push($(this).attr('rel'));
    });

    if (filters.length > 0) {parameters.push(['filter', filters.toString()])}

    for(var i = 0; i < parameters.length; i++) {
      if (i > 0) {url_params = url_params + '&'}
      url_params = url_params + parameters[i][0] + '=' + parameters[i][1];
    }
    return url_params + '&pp=20';
  },

  activateUpload: function(){
    $('#upload-controls').hide();
    $('#update-controls').show();
    $('#asset_title').prop( "disabled", false );
    $('#new_asset input[name="commit"]').prop( "disabled", false );
  },
  activateUpdate: function() {
    $('#upload-controls').show();
    $('#update-controls').hide();
    $('#asset_title').prop( "disabled", true );
    $('#new_asset input[name="commit"]').prop( "disabled", true );
  },

  insertAtCursor: function(field, insertion) {
    if (document.selection) {  // ie
      field.focus();
      var sel = document.selection.createRange();
      sel.text = insertion;
    }
    else if (field.selectionStart || field.selectionStart == '0') {  // moz
      var startPos = field.selectionStart;
      var endPos = field.selectionEnd;
      field.value = field.value.substring(0, startPos) + insertion + field.value.substring(endPos, field.value.length);
      field.selectionStart = field.selectionEnd = startPos + insertion.length;
    } else {
      field.val(field.val() + insertion);
    }
  },
  filterAssets: function() {
    var url = $("#filesearchform").attr('action');
    var parameters = Assets.assetFilterParameters();

    url = url + "?" + parameters;
    $.ajax({
      url: url,
      complete: function(data, textStatus, jqXHR) {
        Assets.updateTable(data.responseText);
      }
    });
  },
  updateTable: function(html) {
    $("#assets_table").html(html);
    Assets.attachEvents();
  },
  addToList: function(html){
    var list = $('#attachment_fields');
    list.append(html);
    Assets.showListIfHidden();
    Assets.notify('Save page to commit changes');
    Assets.attachEvents();
    // I'm not sure what Sortable does and can't find any example of
    // its use in current Radiant, so I'm going to comment it out for now.

    //Assets.makeSortable(list);

  },
  removeFromList: function(container) {
    container.children('input.attacher').remove();
    container.children('input.pos').remove();
    container.children('input.destroyer').val(1);
    container.fadeOut();
    container.addClass('detached');
  },
  showListIfHidden: function() {
    var list = $('#attachment_fields');
    if (list.hasClass('empty')) {
      list.removeClass('empty');
    }
  },
  notify: function(message){
    $('#attachment_list span.message').html(message).addClass('important');
  }

};


$(function() {

  $('a.selective').click(function(e){
    e.preventDefault();
    var element = $(this);
    var type_id = element.attr('rel');
    var type_check = $('#' + type_id + '-check');

    if(element.hasClass('pressed')) {
      element.removeClass('pressed');
      $(type_check).prop('checked', false);
      if ($('a.selective.pressed').length == 0) $('#select_all').addClass('pressed');
    }
    else {
      element.addClass('pressed');
      $('a.deselective').each(function() { $(this).removeClass('pressed'); });
      $(type_check).prop('checked', true);
    }
    Assets.filterAssets();
    Assets.attachEvents();

  });

  $('a.deselective').click(function(e){
    e.preventDefault();
    var element = $(this);
    if(!element.hasClass('pressed')) {
      $('a.selective').each(function() { $(this).removeClass('pressed'); });
      $('input.selective').each(function() { $(this).prop('checked', false); });
      element.addClass('pressed');
      Assets.filterAssets();
      Assets.attachEvents();
    }
  });

  $('#filesearchforminput').keyup(function(){
    Assets.filterAssets();
    Assets.attachEvents();
  });

  $("#attach_assets").click(function(e) {
    e.preventDefault();
    Popup.show('attach_asset');
    $('.close_popup').click(function(e){
      e.preventDefault();
      Popup.close();
      $('#attach_asset').hide();
    });
  });

  $('#filesearchforminput').keyup(function(){
    Assets.filterAssets();
  });

  $("#upload_asset_link").click(function(e) {
    e.preventDefault();
    Popup.close();
    $('#attach_asset').hide();
    Assets.activateUpdate();
    Popup.show('upload_asset');

    $("#attach-popup").click(function(e) {
      e.preventDefault();
      Popup.close();
      $('#upload_asset').hide();
      Popup.show('attach_asset');
      $('.close_popup').click(function(e){
        e.preventDefault();
        Popup.close();
        $('#attach_asset').hide();
      });
    });

  $('.close_popup').click(function(e){
    e.preventDefault();
    Popup.close();
    $('#upload_asset').hide();
    });
  });

  $('#update_asset').submit(function(e){
    e.preventDefault();
    $("#update-asset").attr("disabled", true);
    $('#update-status').show();
    $.ajax({
      method: 'put',
      url: $(this).attr('action') + $("#asset_id").val(),
      data: $(this).serialize(),
      complete: function(data, textStatus, jqXHR) {
        Popup.close();
        $('#upload_asset').hide();
        $('#update-status').hide();
        $("#update-asset").attr("disabled", false);
        $('#update_asset').trigger("reset");
      }
    });
  });

  $('#asset_asset').fileupload({
    add: function(e, data) {
      $("#asset_asset").attr("disabled", true);
      $('#upload-status').show();
      data.submit();
    },
    done: function (e, data) {
      $("#asset_id").val($(data.result).find(".attacher").val());
      Assets.addToList($(data.result));
      Assets.activateUpload();
      $("#asset_asset").attr("disabled", false);
      $('#upload-status').hide();
    }
  });

  Assets.attachEvents();

});

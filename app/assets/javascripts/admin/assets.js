Assets = {
  filterAssets: function() {
    var parameters = [];
    var url = $("#filesearchform").attr('action');

    if ($('#filesearchforminput').val() !== '') {
      parameters.push(['search', $('#filesearchforminput').val()]);
    }
    var filters = [];
    $('a.selective.pressed').each(function(){
      filters.push($(this).attr('rel'));
    });

    if (filters.length > 0) {parameters.push(['filter', filters.toString()])}

    for(var i = 0; i < parameters.length; i++) {
      if (i > 0) {url = url + '&'}
      else {url = url + "?"}
      url = url + parameters[i][0] + '=' + parameters[i][1];
    }

    $.ajax({
      url: url,
      complete: function(data, textStatus, jqXHR) {
        Assets.updateTable(data.responseText);
      }
    });
  },
  updateTable: function(html) {
    $("#assets_table").html(html);
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

  });

  $('#filesearchforminput').keyup(function(){
    Assets.filterAssets();
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

});

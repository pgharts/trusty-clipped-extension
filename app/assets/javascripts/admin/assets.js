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
  $('#assets_table .pagination a').click(function(e){
    e.preventDefault();
    var url = this.attr('href');
    // BELOW THIS BE PROTOTYPE
    var pagination = url.toQueryParams();
    var search_form = $('filesearchform');
    search_form.down('#p').value = pagination['p'];
    Asset.UpdateTable(false);
  });

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

});

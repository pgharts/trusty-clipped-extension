Asset.UpdateTable = function (depaginate) {
  var search_form = $('filesearchform');
  if (depaginate && search_form.down('#p')) search_form.down('#p').value = 1;
  Asset.AllWaiting();
  new Ajax.Updater('assets_table', search_form.action, {
    asynchronous: true,
    evalScripts: false,
    parameters: Form.serialize(search_form),
    method: 'get'
  });
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
});

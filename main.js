$(document).ready(function () {
  $('#search-form').submit(function (e) {
    e.preventDefault();

    const query = $('#search-input').val().trim();
    if (!query) return;

    $('#loader').removeClass('hidden').text('Loading...');
    $('#error').addClass('hidden').text('');
    $('#results').empty();

    $.ajax({
      url: 'https://api.giphy.com/v1/gifs/search',
      method: 'GET',
      dataType: 'json',
      data: {
        api_key: 'dc6zaTOxFJmzC',  // Public test key
        q: query,
        limit: 24
      },
      success: function (res) {
        const gifs = res.data;
        if (!gifs || gifs.length === 0) {
          $('#error').removeClass('hidden').text('No GIFs found.');
          return;
        }
        gifs.forEach(gif => {
          const imgUrl = gif.images.fixed_height.url;
          if (imgUrl) {
            $('#results').append(`<img src="${imgUrl}" alt="GIF" />`);
          }
        });
      },
      error: function (xhr) {
        console.error('Status:', xhr.status);
        console.error('Response:', xhr.responseText);
        $('#error').removeClass('hidden').text('Error fetching GIFs.');
      },
      complete: function () {
        $('#loader').addClass('hidden');
      }
    });
  });
});

$('#server-test').on('click', () => {
  axios.post('/', {server: 'test'})
});

$('.fa-spotify').on('click', () => {
  $('.results').css('display', 'none');
  $('#accordion').css('display', 'block');
  let html = '';
  axios.post('/spotify', {song: $('.spotify').val()}).then((res) => {
    res.data.forEach((song, i) => {
      html +=
        `
      <div class="card">
        <div class="card-header" role="tab" id="heading-${i}">
          <h5 class="mb-0">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapse-${i}" aria-expanded="true"
               aria-controls="collapseOne">
              <span class="title">${song.artist + ': ' + song.song + ' '}<i style="font-size: 20px;" class="fa fa-angle-down" 
              aria-hidden="true"></i></span>
            </a>
          </h5>
        </div>
        <div id="collapse-${i}" class="collapse" role="tabpanel" aria-labelledby="heading-${i}">
          <div class="card-block pt-0 pb-0 pl-0 pr-0">
            <ul class="list-group">
              <li class="list-group-item tweet"><Strong>Album</Strong>: ${song.album}</li>
              <li class="list-group-item tweet"><Strong>Url </Strong>: <a class="ml-1" href="${song.url}">
              ${song.url}</a></li>
            </ul>
          </div>
        </div>
    </div>
        `
    });
    $('#accordion').html(html);
    console.log(res);
  })
});

$('#twitter').on('click', () => {
  $('.results').css('display', 'flex');
  $('.results').empty();
  $('#accordion').css('display', 'none');
  axios.get('/twitter').then((res) => {
    let html = '';
    res.data.forEach((tweet) => {
      html += `<li class="list-group-item tweet">${tweet}</li>`
    });
    $('.list-group').html(html);
  })

});

$('.fa-imdb').on('click', () => {
  $('.results').css('display', 'flex');
  $('.results').empty();
  $('#accordion').css('display', 'none');
  let html = '';
  axios.post('/imdb', {movie: $('.imdb').val()}).then((res) => {
    for (val in res.data) {
      html += `<li class="list-group-item omdb">${val + ': ' + res.data[val]}</li>`
    }
    $('.list-group').html(html);
  })
});

// $('#spotify').on('click', (e) => {
//   alert('clicked');
//   // e.preventDefault();
//   // let song = $('.spotify').val();
//   // console.log(song);
//   // axios.post('/spotify', {song: song})
// });
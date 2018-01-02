
(function(){
  $.get("https://feeds.feedburner.com/ResearchDiscussions-DataScienceCentral", function(data) {
    var $xml = $(data);
    $xml.find("entry").each(function() {
        var $this = $(this),
            item = {
                title: $this.find("title").text(),
                link: $this.find("link").attr("href"),
                description: $this.find("description").text(),
                pubDate: $this.find("updated").text(),
                author: $this.find("author").text(),
                content: $this.find("content").text()
        }
        var html_container = document.createElement('div');
        html_container.innerHTML = item.content;
        var src = "img/logo.png";
        var img = html_container.querySelector('img');
        
        if(img){
          src = img.getAttribute('src');
        }

        var date = new Date(item.pubDate)
        var html =`
        <li rel="24591004" class="dcsns-li dcsns-youtube dcsns-feed-0">
        <div class="inner"><span class="section-thumb">
        <a href="${item.link}" title="${item.title}">
        <img src="${src}" alt="" style="opacity: 1; display: inline;">
        </a></span><span class="section-title">${item.title}</span>
        <span class="section-user"></span>
        <span>${formatDate(date)}</span>
        `;

        $('ul.stream').append(html).css('opacity',0).show().fadeTo(800,1);
    });
  });

  function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var day = date.getDay();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
})();

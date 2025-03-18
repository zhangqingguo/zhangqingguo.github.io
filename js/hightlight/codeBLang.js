/*
$(function () {
	console.log($('code.hljs').length);
  $('code.hljs').each(function() {
    var classArray = $(this).attr('class').split(' '); // 将class属性值分割成数组
    // 从数组中排除'hljs'，找到的第一个元素即为语言标识
    var language = classArray.filter(cls => cls !== 'hljs')[0];
    if (language) {
      console.log('识别的编程语言:', language);
		language = language.slice(0, 1).toUpperCase() + language.slice(1);
	// 为当前code元素动态创建并插入一个显示语言的div
      var $langDiv = $('<div class="code_lang" title="' + language + '">' + language + '</div>');
      $(this).before($langDiv); // 在当前code元素之前插入新创建的div
    }
  });
});
*/
$(window).on('load', function() { 
	$('code.hljs').each(function() {
    var classArray = $(this).attr('class').split(' '); // 将class属性值分割成数组
    // 从数组中排除'hljs'，找到的第一个元素即为语言标识
    var language = classArray.filter(cls => cls !== 'hljs')[0];
    if (language) {
      console.log('识别的编程语言:', language);
	  language = language.slice(0, 1).toUpperCase() + language.slice(1);
	// 为当前code元素动态创建并插入一个显示语言的div
      var $langDiv = $('<div class="code_lang" title="' + language + '">' + language + '</div>');
      $(this).before($langDiv); // 在当前code元素之前插入新创建的div
    }else{
		language = classes.find(cls => cls.startsWith('language-'));
        if (language) {
            var language = language.substring('language-'.length);
            console.log('识别的编程语言:', language);
			// 为当前code元素动态创建并插入一个显示语言的div
            var $langDiv = $('<div class="code_lang" title="' + language + '">' + language + '</div>');
           $(this).before($langDiv); // 在当前code元素之前插入新创建的div
        }
	}
  });
  })

/*
$(function () {
  var $highlight_lang = $('<div class="code_lang" title="代码语言"></div>');

  $('pre').after($highlight_lang);
  $('pre').each(function () {
    var code_language = $(this).attr('class');

if (!code_language) {
  return true;
};
var lang_name = code_language.replace("line-numbers", "").trim().replace("language-", "").trim();

// 首字母大写
lang_name = lang_name.slice(0, 1).toUpperCase() + lang_name.slice(1);
$(this).siblings(".code_lang").text(lang_name);

  });
});
*/
$(window).on('load', function() {
    // 为每个.code-area添加全屏图标
    $('.code-area').prepend($('<i class="fas fa-expand full_screen" title="全屏" aria-hidden="true"></i>'));

    // 为每个代码块处理全屏逻辑
    $('.code-area').each(function() {
        var $codeBlock = $(this);
        var $pre = $codeBlock.find('pre');
        var $fullScreenBtn = $codeBlock.find('.full_screen');

        // 双击 pre 元素退出全屏
        $pre.on('dblclick', function() {
            toggleFullScreen($pre,$codeBlock);
			$codeBlock.find('.full_screen, .code-expand, .code_copy').show();
        });

        // 点击全屏图标切换全屏
        $fullScreenBtn.on('click', function() {
            toggleFullScreen($pre,$codeBlock);
        });
    });
});

function toggleFullScreen($pre,$codeBlock) {
	if($codeBlock.hasClass('code-closed')){
		return;
	}
	
    if ($pre.hasClass('pre-full-screen')) {
        $pre.removeClass('pre-full-screen');
        $pre.attr("title", "");
		$codeBlock.find('.full_screen, .code-expand, .code_copy').show();
    } else {
        $pre.addClass('pre-full-screen');
        $pre.attr("title", "双击关闭全屏");
		$codeBlock.find('.full_screen, .code-expand, .code_copy').hide();
		
    }
}
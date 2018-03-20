var html ="";
for(var i=0;i<5;i++){
    html+=
    `<div class="trends-one clear">
        
        <div class="img left">
               <img src="img/trends1.jpg"/>
        </div> 
        <div class="comment left">
              <div class="trends-tit">
                  <a href="#" title="AI 眼中的人类世界：带着“偏见”，而且审美有些“黑暗”">
                        AI 眼中的人类世界：带着“偏见”，而且审美有些“黑暗”
                  </a>
              </div>
              <div class="trends-time">
                    发布日期：2017.07.13 分类：全部资讯 商城动态
              </div>
              <div class="trends-comment">
                    从一九四七年巴黎蒙田大街30号（30 Avenue Montaigne）New Look的展出开始，
                    Dior就成为高级女装的代名词, 继承了法国高级女装的传统，始终保持华丽的设计路线，
                    做工精细，迎合上流社会成熟女性的审美品味，象征着法国时装文化的最高精神。
              </div> 
        </div>
        <i class="clear"></i>
    </div>       
        `
        $(".trends-list").html(html)

}
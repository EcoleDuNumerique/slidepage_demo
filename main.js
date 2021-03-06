//On cache toute les pages sauf la page active
$(".page").hide().each(function(){
    if( $(this).hasClass("active"))
        $(this).show();
});

//Au click sur un lien
$("a").click(function(e){

    //on annule la navigation
    e.preventDefault();

    //On récupere la page active
    var $current = $(".page.active");

    //On récupere le nom de la page vers laquelle on veut aller
    var target = $(this).attr("href");

    //On ne navigue que si la destination est diferente de la page active
    if( $current.attr("data-page") == target )
        return;
        
    //On recupere la page de destination
    var $target = $("[data-page='"+target+"']");

    //On check si le reverse est actif
    var reverse = $(this).data("dir") == "reverse";

    if( reverse ){
        //On place l'élément cible derriere l'élément actif
        $current.before( $target );

        //On attribut la classe active a notre élément
        $target.show().addClass("active");

        //On ajoute la classe reversed pour le css aux deux éléments
        $entities = $current.add( $target );
        $entities.addClass("reversed");

        //On déclenche l'animation avec quelque centieme de retard
        setTimeout(function(){
            $entities.addClass("animation-reverse");
        }, 0);
    }
    else{
        //On déplace la page de destination a droite de la page en cours
        $current.after( $target );

        //On affiche la page de destination
        $target.show().addClass("active");

        //Je selectionne mes 2 éléments
        $entities = $current.add( $target );

        //J'anime la transition
        $entities.addClass("animation");
    }

    //Le temps correspond au temps de la css class animation
    setTimeout(function(){
        //Je cache l'ancienne page active
        $current.hide().removeClass("active");

        //Je retire toute les classes animations et reverse
        $entities.removeClass("animation reversed animation-reverse");
        
    }, 500);

});


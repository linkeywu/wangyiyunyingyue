export default function(Vue){
    Vue.directive('height', {
        inserted(el,binding){
            var height = document.documentElement.clientHeight - binding.value;
            el.style.height = height + "px";
        }
    })
}
import {  ref } from "vue";

const fontSize = ref(18)

export default function useFontSize(){

    function setFontSize(val){
        fontSize.value = val;
    }

    return {fontSize, setFontSize}
}
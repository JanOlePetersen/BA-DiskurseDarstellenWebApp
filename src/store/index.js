import {  ref } from "vue";

// store font size
const fontSize = ref(18)

export default function useFontSize(){

    /**
     * Set font size
     * @param val : int font size
     */
    function setFontSize(val){
        fontSize.value = val;
    }

    // return font size
    return {fontSize, setFontSize}
}
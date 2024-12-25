let fileInput = document.getElementById('file'),
ChooseImg = document.querySelector('.Choose-img'),
saveImg = document.querySelector('.save-img'),
previewImg = document.querySelector('.preview-img img'),
resetFilter = document.querySelector('.reset-filter'),
filterOptions = document.querySelectorAll('.filter  button'),
filterSlider = document.querySelector('.slider input'),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
rotateOptions = document.querySelectorAll('.rotate button');
filter = document.querySelector('.filter'),
rotate = document.querySelector('.rotate')

let Brightness = 100, Contrast = 100, Invert=0, Hue =0, Saluration=100, blurred = 0;
let rotateImg = 0 , flipHorizontal = 1, filpVertical = 1;


ChooseImg.addEventListener('click',() => fileInput.click());

function showImage(){
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    resetFilter.classList.remove('disabled');
    filter.classList.remove('disabled');
    filterSlider.classList.remove('disabled');
    rotate.classList.remove('disabled');
}
fileInput.addEventListener('change', showImage);

function applyFilter(){
    previewImg.style.transform = `rotate(${rotateImg}deg) scale(${flipHorizontal}, ${filpVertical})`;
    previewImg.style.filter = `Brightness(${Brightness}%) Contrast(${Contrast}%) Invert(${Invert}%) Hue-rotate(${Hue}deg) Saluration(${Saluration}%) Blur(${blurred}px)`;
}

filterOptions.forEach(option =>{
    option.addEventListener('click',() =>{
        document.querySelector('.filter button.active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.innerText;
        if(option.id == 'Brightness'){
            filterSlider.min = 0;
            filterSlider.max = 200;
            filterSlider.value = Brightness;
            filterSlider.innerText = `${Brightness}%`;
        }
        else if(option.id == 'Contrast'){
            filterSlider.min = 0;
            filterSlider.max = 200;
            filterSlider.value = Contrast;
            filterSlider.innerText = `${Contrast}%`;
        }
        else if(option.id == 'Invert'){
            filterSlider.min = 0;
            filterSlider.max = 100;
            filterSlider.value = Invert;
            filterSlider.innerText = `${Invert}%`;
        }
        else if(option.id == 'Hue'){
            filterSlider.min = -180;
            filterSlider.max = 180;
            filterSlider.value = Hue;
            filterSlider.innerText = `${Hue}deg`;
        } 
         else if(option.id == 'Saluration'){
            filterSlider.min = 0;
            filterSlider.max = 200;
            filterSlider.value = Saluration;
            filterSlider.innerText = `${Saluration}%`;
        } 
         else if(option.id == 'Blur'){
            filterSlider.min = 0;
            filterSlider.max = 20;
            filterSlider.value = blurred;
            filterSlider.innerText = `${blurred}px`;
        }
    });
});

function updateSlider(){
    filterValue.innerText =`${filterSlider.value}%`;
    let selectedFilter = document.querySelector('.filter .active');
    if(selectedFilter.id == 'Brightness'){
        Brightness = filterSlider.value;
        filterValue.innerText = `${filterSlider.value}%`;
    }
    else if(selectedFilter.id == 'Contrast'){
        Contrast = filterSlider.value;
        filterValue.innerText = `${filterSlider.value}%`;
    }
    else if(selectedFilter.id == 'Invert'){
        Invert = filterSlider.value;
        filterValue.innerText = `${filterSlider.value}%`;
    }
    else if(selectedFilter.id == 'Hue'){
        Hue = filterSlider.value;
        filterValue.innerText = `${filterSlider.value}deg`;
    }
    else if(selectedFilter.id == 'Saluration'){
        Saluration = filterSlider.value;
        filterValue.innerText = `${filterSlider.value}%`;
    }
    else if(selectedFilter.id == 'Blur'){
        blurred = filterSlider.value;
        filterValue.innerText = `${filterSlider.value}px`;
    }
    applyFilter();

}

rotateOptions.forEach(rotateOptions =>{
    rotateOptions.addEventListener('click', () =>{
        if(rotateOptions.id == left){
            rotateImg -= 90;
        }
        else if(rotateOptions.id == right){
            rotateImg += 90;
        }
        else if(rotateOptions.id == horizontal){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        else if(rotateOptions.id == vertical ){
            filpVertical = filpVertical === 1 ? -1 : 1;
        }
        applyFilter();
    })
})
function resetFilters(){
    
      Brightness = 100, Contrast = 100, Invert=0, Hue =0, Saluration=100, blurred = 0;
      rotateImg = 0 , flipHorizontal = 1, filpVertical = 1;
      filterOptions[0].click();
      applyFilter();
}

function saveImage(){
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.translate(canvas.width / 2 , canvas.height / 2);
    ctx.filter = `Brightness(${Brightness}%) Contrast(${Contrast}%) Invert(${Invert}%) Hue-rotate(${Hue}deg) Saluration(${Saluration}%) Blur(${blurred}px)`;
    if(rotateImg !== 0){
        ctx.rotate(rotateImg *Math.PI / 180);
    }
    ctx.scale(flipHorizontal, filpVertical);
    ctx.drawImage(previewImg, -canvas.width / 2 , -canvas.height / 2 , canvas.width, canvas.height);
    let link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL();
    link.click();

}


 saveImg.addEventListener('click', saveImage);
 resetFilter.addEventListener('click', resetFilters);
filterSlider.addEventListener('input', updateSlider);
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const listSuggest = $('.list-suggest');
const suggestSearchBtn = $('.suggest-search-box');
const header = $('#header');
const elementSuggestActive = $('header .content .suggest span.active');
const calendar = $('#calendar');
var amountCustomer = $$('.customer-number');
var totalAmountCustomer = 0;
const closeBtnSuggestCustomer = $('.suggest-customer__close-icon');
const categoryBtn = $('.category');
const line = $('#line-active');
const tabActive = $('.support-global-heading > span.active');
// Các functions
/* ------------------- */
// Hàm thoát khỏi các box con
function escape() {
    calendar.classList.remove('active');
    $('.sub-suggest-customer').classList.remove('active');
    $('#support-global').classList.remove('active');
    $('.sub-user-options').classList.remove('active');
}

// Hàm thực thi khi scrollTop
function handleScrollTop() {
    Object.assign(header.style, {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        backgroundColor: 'var(--white-color)',
        color: 'var(--text-color)',
        padding: '16px 0',
    })
    $('.nav svg').style.fill = 'var(--primary-color)';
    $('header .content').style.padding = '0';
    $('.become-host a').style.color = 'var(--text-color)';
    $('.list-suggest').classList.remove('active');
    $('.suggest-text').classList.remove('active');
    $('.suggest-search-box').classList.add('active');

}

// Header mặc định
function everScrollTop(){
    Object.assign(header.style, {
        position: 'relative',
        top: 0,
        right: 0,
        width: '100%',
        color: 'var(--white-color)',
        backgroundColor: 'var(--black-color)',
    })
    $('.nav svg').style.fill = 'var(--white-color)';
    $('#e-experience > a').style.color = 'var(--white-color)';
    $('header .content').style.padding = '16px 0 100px';
    $('.become-host a').style.color = 'var(--white-color)';
    $('.list-suggest').classList.add('active');
    $('.suggest-text').classList.add('active');
    $('.suggest-search-box').classList.remove('active');
    elementSuggestActive.classList.remove('change');
    $('header .content .suggest span').classList.remove('change');
}

// Show calendar
function clickCalendar() {
    calendar.classList.add('active');
}

function showCalendar() {
    $('.calendar-detail').classList.add('active');
    $('.flexible-days-detail ').classList.remove('active');
    $('.flexible-days').classList.remove('active');
    $('.calendar-show').classList.add('active');
}
// Show flexible days
function showFlexibleDays() {
    $('.flexible-days').classList.add('active');
    $('.calendar-detail').classList.remove('active');
    $('.calendar-show').classList.remove('active');
    $('.flexible-days-detail ').classList.add('active');
}

// Tính tổng số lượng khách muốn đặt
function handleTotalCustomer(){
    totalAmountCustomer = Array.from(amountCustomer).reduce(function(acc, block){
        return acc + Number(block.innerText);
    }, 0)
}


// --------
// Khi click ra document thoát các box con hoặc dùng ESC
// Khi click ra ngoài

document.onclick = function(e){
    escape();
}


// Khi dùng ESC
document.onkeydown = function(e){
    // When user click ESC button
    if(e.which === 27){
        escape();
    }
}

// Header change when scroll
window.scrollY = 0;
document.onscroll = function(){
    let scrollTop =  window.scrollY || document.documentElement.scrollTop;
    if(scrollTop >= 18){
        handleScrollTop();
    }
    else{
        everScrollTop();
    }
}

// Suggest button when click
suggestSearchBtn.onclick = function(){
    this.classList.remove('active');
    $('.suggest-text').classList.add('active');
    $('.list-suggest').classList.add('active');
    $('header .content').style.padding = '16px 0 100px';
    Object.assign(header.style, {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        backgroundColor: 'var(--white-color)',
        color: 'var(--text-color)',
        padding: '16px 0',
    });
    elementSuggestActive.classList.add('change');
    $('#e-experience > a').style.color = 'var(--text-color)';
    $('.list-suggest').style.border = '1px solid #e2e2e2';
    $('.suggest-search').click();
}


// 2 buttons suggest on header
$$('.suggest-second > div:not(.suggest-customer)').forEach(function (div){
    div.onclick = function(e){
        e.stopPropagation();
        calendar.classList.toggle('active');
    }
})

$('.suggest-second.experience').onclick = function(e){
    e.stopPropagation();
    calendar.classList.toggle('active');
}

// StopPropagation when click box calendar
calendar.onclick = function(e){
    e.stopPropagation();
}

// Suggest customer
$('.suggest-customer').onclick = function(e){
    e.stopPropagation();
   $('.sub-suggest-customer').classList.toggle('active');
   $('.sub-suggest-customer').style.animation = 'showFromBottom 0.3s linear';
}
// amount-customer buttons
$('.sub-suggest-customer').onclick = function(e){
    e.stopPropagation();
}


$$('.amount-customer .increase-number-btn').forEach(function(button){
    button.onclick = function(e){
        e.stopPropagation();
        var amountCustomer = e.target.closest('.amount-customer').querySelector('.customer-number');
        amountCustomer.innerText = Number(amountCustomer.innerText) + 1;
        if(Number(amountCustomer.innerText) > 0){
            e.target.closest('.amount-customer').querySelector('.decrease-number-btn').style.opacity = 1;
        }
        handleTotalCustomer();
        if(totalAmountCustomer > 0){
            $('.total-amount-customers').innerText = totalAmountCustomer + ' khách';
            closeBtnSuggestCustomer.classList.add('active');
        }
        
    }
})

$$('.amount-customer .decrease-number-btn').forEach(function(button){
    button.onclick = function(e){
        e.stopPropagation();
        var amountCustomer = e.target.closest('.amount-customer').querySelector('.customer-number');
        amountCustomer.innerText = Number(amountCustomer.innerText) > 0 ? Number(amountCustomer.innerText) - 1 : 0;
        if(Number(amountCustomer.innerText) === 0){
            e.target.closest('.amount-customer').querySelector('.decrease-number-btn').style.cursor = 'not-allowed';
            e.target.closest('.amount-customer').querySelector('.decrease-number-btn').style.opacity = 0.5;
        }
        handleTotalCustomer();
        if(totalAmountCustomer >= 0){
            $('.total-amount-customers').innerText = totalAmountCustomer + ' khách';
            closeBtnSuggestCustomer.classList.add('active');
        }
    }
})

// Khi click close button: reset số lượng khách
closeBtnSuggestCustomer.onclick = function(e){
    e.stopPropagation();
    totalAmountCustomer = 0;
    $('.total-amount-customers').innerText = 'Thêm khách';
    amountCustomer.forEach((customer) => {
        customer.innerText = '0';
    })
    this.classList.remove('active');
}

// Change tab when click tab: Trải ngiệm
$('#living').onclick = function(e){
    this.classList.add('active');
    $('#experience').classList.remove('active');
    $('.col.row.c-7.suggest-second.check-room').classList.add('active');
    $('.col.row.c-7.suggest-second.experience').classList.remove('active');
}

$('#experience').onclick = function(e){
    this.classList.add('active');
    $('#living').classList.remove('active');
    $('.col.row.c-7.suggest-second.experience').classList.add('active');
    $('.col.row.c-7.suggest-second.check-room').classList.remove('active');
}

// Show box support language & Cash
categoryBtn.onclick = function(e) {
    e.stopPropagation();
    $('#support-global').classList.add('active');
   
    line.style.left = tabActive.offsetLeft + 'px';
    line.style.width = tabActive.offsetWidth + 'px';
}

// Close global support
$('.support-global-container').onclick = function(e) {
    e.stopPropagation();
}
$('.support-global__close-btn').onclick = function(e) {
    $('#support-global').classList.remove('active');
}

// List languages & areas
const listLanguageAreas = [
    {
        language: 'English',
        area: 'United States'
    },
    {
        language: 'English',
        area: 'United Kingdom'
    },
    {
        language: 'English',
        area: 'Australia'
    },
    {
        language: 'Francais',
        area: 'France'
    },
    {
        language: 'Tiếng Việt',
        area: 'Việt Nam'
    },
    {
        language: 'Thái Lan',
        area: 'ThaiLand'
    },
    {
        language: 'Chinese',
        area: 'China'
    },
    
]
// Render languages & areas
const renderListLanguageAreas = listLanguageAreas.map((block) => {
    return `
        <a href="" class="col col-2-4">
            <p>${block.area}</p>
            <p class="language-area-suggest--area">${block.language}</p>
        </a>
    `
})
$('.language-area-suggest--detail').innerHTML = renderListLanguageAreas.join('');

// Show tab languages & areas

$('#language-areas').onclick = function(e) {
    this.classList.add('active');
    $('#support-translate').classList.add('active');
    $('#support-cash').classList.remove('active');
    $('#category-cash').classList.remove('active');
    line.style.left = this.offsetLeft + 'px';
    line.style.width = this.offsetWidth + 'px';
}

$('#category-cash').onclick = function(e) {
    this.classList.add('active');
    $('#support-cash').classList.add('active');
    $('#support-translate').classList.remove('active');
    $('#language-areas').classList.remove('active');
    line.style.left = this.offsetLeft + 'px';
    line.style.width = this.offsetWidth + 'px';
}

// State translate button
$('.support-global-translate__apply-btn').onclick = function(e){
   $('.support-global-translate__apply-btn--circle').classList.toggle('active');
   this.classList.toggle('active');
   $('.support-global-translate__apply-btn--circle').style.transition = 'all 0.1s linear';
}

// List languages & areas
const listCategoryCashes = [
    {
        unit: 'Baht Thái Lan',
        signal: 'THB-B'
    },
    {
        unit: 'Bảng Anh',
        signal: 'GBP - £'
    },
    {
        unit: 'Việt Nam Đồng',
        signal: 'VND'
    },
    {
        unit: 'Đô la Mỹ',
        signal: 'USD'
    },
    {
        unit: 'Dirham Maroc',
        signal: 'MAD'
    },
    {
        unit: 'Euro',
        signal: 'EUR - €'
    },
]
// Render languages & areas
const renderListCategoryCash = listCategoryCashes.map((block) => {
    return `
        <a href="" class="col col-2-4">
            <p>${block.unit}</p>
            <p class="category-cash-suggest--unit">${block.signal}</p>
        </a>
    `
})

$('.category-cash-suggest').innerHTML = renderListCategoryCash.join('');


// Show user-options box
$('.user-options').onclick = function(e){
    e.stopPropagation();
    $('.sub-user-options').classList.toggle('active');
}

$('.sub-user-options').onclick = function(e){
    e.stopPropagation();
}

// Mobile
$('.header-box-search').onclick = function(){
    $('#tab-search-mobile').classList.add('active');
}

$('.tab-search__prev-btn').onclick = function(){
    $('#tab-search-mobile').classList.toggle('active');
}
$(function () {
    // 全選
    $('.checkall').change(function () {
        $('.checkall,.j-checkbox').prop('checked', $(this).prop('checked'))

        // 全部添加背景色
        if ($(this).prop('checked')) {
            $('.cart-item').css('background', '#fff4e8')
        } else {
            $('.cart-item').css('background', 'transparent')
        }

    })

    $('.j-checkbox').change(function () {
        // 單選全勾選，全選也勾選
        if ($('.j-checkbox:checked').length == $('.j-checkbox').length) {
            $('.checkall').prop('checked', true)
        } else {
            $('.checkall').prop('checked', false)
        }

        // 被勾選的添加背景色
        if ($(this).prop('checked')) {
            $(this).closest('.cart-item').css('background', '#fff4e8')
        } else {
            $(this).closest('.cart-item').css('background', 'transparent')
        }
    })

    // 增加減少商品數量

    // 目前商品數
    let num;
    // 商品單價
    let p;
    // 目前商品小計
    let price;

    // 增加
    $('.increment').on('click', function () {
        num = $(this).siblings('.itxt').val();
        // 點增加就加1
        num++;
        // 賦值
        $(this).siblings('.itxt').val(num);

        // 小計
        // 獲取單價的值
        p = $(this).closest('.p-num').siblings('.p-price').html();
        // 刪除錢字號
        p = p.slice(1, p.length);

        // toFixed(2) 顯示到小數點二位數
        price = (p * num).toFixed(2);

        // 賦值到小計
        $(this).closest('.p-num').siblings('.p-sum').html('￥' + price);

        // 修改總數和總額
        getAll();

    })

    // 減少
    $('.decrement').on('click', function () {
        num = $(this).siblings('.itxt').val();
        // 點減少就減1
        num--;
        // 商品數不能少於1
        if (num <= 0) {
            num = 1
        }
        // 賦值
        $(this).siblings('.itxt').val(num);

        // 小計
        // 獲取單價的值
        p = $(this).closest('.p-num').siblings('.p-price').html();
        // 刪除錢字號
        p = p.slice(1, p.length);

        // toFixed(2) 顯示到小數點二位數
        price = (p * num).toFixed(2);

        // 賦值到小計
        $(this).closest('.p-num').siblings('.p-sum').html('￥' + price);

        // 修改總數和總額
        getAll();

    })

    // 直接修改數量
    $('.itxt').change(function () {
        num = $(this).val();
        // 不能輸入1以下的數字
        if (num <= 0) {
            num = 1;
            $(this).val(1)
        }

        // 小計
        // 獲取單價的值
        p = $(this).closest('.p-num').siblings('.p-price').html();
        // 刪除錢字號
        p = p.slice(1, p.length);

        // toFixed(2) 顯示到小數點二位數
        price = (p * num).toFixed(2);

        // 賦值到小計
        $(this).closest('.p-num').siblings('.p-sum').html('￥' + price);

        // 修改總數和總額
        getAll();
    })

    // 總數和總額
    function getAll() {
        // 這兩個變數要聲明在裡面
        // 商品總數 (先賦值0，否則會undefind)
        let count = 0;
        // 商品總額 (先賦值0，否則會undefind)
        let pay = 0;

        // 迴圈，加總所有商品數
        $('.itxt').each(function (i, e) {
            count += parseInt($(e).val());
        })
        // 賦值
        $('.amount-sum em').html(count);

        // 迴圈，加總所有金額
        $('.p-sum').each(function (i, e) {
            pay += parseFloat($(e).html().slice(1, e.length));
        })
        // 賦值
        $('.price-sum em').html('￥' + pay.toFixed(2));
    }
    // 頁面一載入就調用
    getAll();

    // 單筆刪除
    $('.p-action').on('click', function () {
        $(this).closest('.cart-item').remove();

        // 修改總數和總額
        getAll();
    })

    // 刪除勾選的商品
    $('.remove-batch').on('click', function () {
        $('.j-checkbox:checked').closest('.cart-item').remove();

        // 修改總數和總額
        getAll();
    })

    // 清空購物車
    $('.clear-all').on('click', function () {
        $('.cart-item').remove();

        // 修改總數和總額
        getAll();
    })





})
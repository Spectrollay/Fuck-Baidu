//fuck baidu
// ==UserScript==
// @name         Fuck baidu
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  屏蔽与百度相关的搜索结果Filter out all search results related to "baidu.com" from search engines.
// @author       Hijack_Nick & Spectrollay
// @match        *://*.google.com/*
// @match        *://*.bing.com/*
// @match        *://search.yahoo.com/search*
// @grant        none
// @license      MIT
// ==/UserScript==
 
(function() {
    'use strict';
 
    const filterKeywords = ['baidu', '百度'];
 
    function filterResults() {
        const results = document.querySelectorAll('.b_algo');
 
        results.forEach(result => {
            const resultText = result.innerText.toLowerCase();
 
            filterKeywords.forEach(keyword => {
                if (resultText.includes(keyword)) {
                    result.style.display = 'none';
                }
            });
        });
    }
 
    filterResults();
 
    const searchInput = document.querySelector('#sb_form_q');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const results = document.querySelectorAll('.b_algo');
            results.forEach(result => {
                result.style.display = '';
            });
            filterResults();
        });
 
        const searchForm = document.querySelector('#sb_form');
        if (searchForm) {
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                filterResults();
            });
        }
    }
 
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length || mutation.removedNodes.length) {
                filterResults();
            }
        });
    });
 
    observer.observe(document.body, { childList: true, subtree: true });
 
})();

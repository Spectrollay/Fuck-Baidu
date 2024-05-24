//fuck Baidu
// ==UserScript==
// @name         Fuck Baidu
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  屏蔽搜索引擎中来自百度的搜索结果 Filter out all search results from "baidu.com" for some search engines.
// @author       Hijack_Nick & Spectrollay
// @match        *://*.google.com/*
// @match        *://*.bing.com/*
// @match        *://*.yahoo.com/*
// @grant        none
// @license      MIT
// ==/UserScript==
 
(function() {
    'use strict';

    const filterKeywords = ['baidu', '百度'];

    function filterResults() {
        let results = [];

        if (location.hostname.includes('google.com')) {
            results = document.querySelectorAll('.g');
        } else if (location.hostname.includes('bing.com')) {
            results = document.querySelectorAll('.b_algo');
        } else if (location.hostname.includes('yahoo.com')) {
            results = document.querySelectorAll('.dd.algo');
        }

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

    const searchInput = document.querySelector('input[name="q"], input[name="p"], #sb_form_q');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const results = document.querySelectorAll('.g, .b_algo, .dd.algo');
            results.forEach(result => {
                result.style.display = '';
            });
            filterResults();
        });

        const searchForm = searchInput.closest('form');
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

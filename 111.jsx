// ==UserScript==
// @name         表情包
// @namespace    xxxx
// @version      1.0
// @icon         http://bbs.nga.cn/favicon.ico
// @description  表情脚本
// @author       xx
// @include      /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn|ngabbs\.com)/.+/
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

((ui, poster) => {
    if (!ui || !poster) return;

    const hookFunction = (object, functionName, callback) => {
        ((originalFunction) => {
            object[functionName] = function () {
                const returnValue = originalFunction.apply(this, arguments);
                callback.apply(this, [returnValue, originalFunction, arguments]);
                return returnValue;
            };
        })(object[functionName]);
    };

    // 更新存储的图片集状态
    const updateStoredIconSetStatus = () => {
        let iconSetStatus = GM_getValue('iconSetStatus') || {};

        GM_setValue('iconSetStatus', iconSetStatus);
    };

    updateStoredIconSetStatus();

    const iconSets = [
        {
            name: 'Sop2',
            credit: '©作者：쮸운',
            data:
                [
                    './mon_201901/11/-klbw3Q5-gq1dKaT8S2s-2s.gif',
                    './mon_201901/22/-klbw3Q5-jq7cZtToS2s-2s.gif',
                    './mon_201901/11/-klbw3Q5-4j3kK7T8S2s-2s.jpg',
                    './mon_201901/11/-klbw3Q5-6fo2KdT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-7ogmK4T8S2s-2s.jpg',
                    './mon_201901/11/-klbw3Q5-5y0pKjToS2s-2s.png',
                    './mon_201901/11/-klbw3Q5-kcziK3T8S2s-2s.jpg',
                    './mon_201901/11/-klbw3Q5-erjzK3T8S2s-2s.jpg',
                    './mon_201901/11/-klbw3Q5-daxdKiToS2s-2s.png',
                    './mon_201901/11/-klbw3Q5-aam7KdT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-7jg3K4T8S2s-2s.jpg',
                    './mon_201901/11/-klbw3Q5-k393K4T8S2s-2s.jpg',
                    './mon_201901/11/-klbw3Q5-fulsKfT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-1g1KaT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-5nn2K3T8S2s-2s.jpg',
                    './mon_201901/11/-klbw3Q5-b8asKfT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-hf97KbT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-24c5KcT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-daqcK4T8S2s-2s.jpg',
                    './mon_201901/11/-klbw3Q5-j0p5KbT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-3b6jKgT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-8wxkKhT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-4sedK2T8S2s-2s.jpg',
                    './mon_201901/11/-klbw3Q5-aej0KeT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-fz52KdT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-oi5K8T8S2s-2s.jpg',
                    './mon_201901/11/-klbw3Q5-97uKbT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-bk5xKbT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-h5jqKfT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-1qhyKeT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-d3drKjToS2s-2s.png',
                    './mon_201901/11/-klbw3Q5-ioolKaT8S2s-2s.png',
                    './mon_201901/11/-klbw3Q5-2w10KlToS2s-2s.jpg',
                ],
        },
        {
            name: '年糕狗',
            credit: '©作者：祁连子',
            data:
                [
                    './mon_201901/24/-klbw3Q5-i8mnKqToS2g-2s.gif',
                    './mon_201901/24/-klbw3Q5-hc3cK9T8S2g-2s.gif',
                    './mon_201901/24/-klbw3Q5-bnofKsToS2g-2s.gif',
                    './mon_201907/03/-bqqbQ5-6iwwK1gToS2g-2s.gif',
                    './mon_201901/24/-klbw3Q5-5tghKsToS2m-2s.gif',
                    './mon_201901/24/-klbw3Q5-ka7xKaT8S2g-2s.gif',
                    './mon_201901/24/-klbw3Q5-c43iK6T8S2g-2s.gif',
                    './mon_201901/24/-klbw3Q5-6jl8K8T8S2g-2s.gif',
                    './mon_201907/06/-bqqbQ5-8fgyK4T8S2g-2s.gif',
                    './mon_201907/06/-bqqbQ5-1v7iKgT8S2g-2s.gif',
                    './mon_201907/06/-bqqbQ5-ejyrK6T8S2g-2s.gif',
                    './mon_201907/06/-bqqbQ5-ka9qKfT8S2g-2s.gif',
                    './mon_201907/06/-bqqbQ5-4n1rKlToS2i-2s.gif',
                ],
        },
        {
            name: '人形小剧场',
            credit: '©泡面番',
            data:
                [
                    './mon_202003/18/-mpnxjQ5-chehKlToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-62mpKkToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-fdagKmToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-1vlKoToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-97v1KiToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-2p7aKlToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-i5w7KlToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-b10jKkToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-4r0wKlToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-jnzxKmToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-deh7KmToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-7a7cKkToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-zthKoToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-gclbKnToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-10fjKkToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-9xtdKmToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-3wxwKjToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-jbkiKlToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-d7ljKmToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-77noKkToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-flpbKmToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-9opzKkToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-3retKlToS2s-2s.png',
                    './mon_202003/18/-mpnxjQ5-j2igKlToS2s-2s.png',
                    './mon_202003/20/-mpnxjQ5-4nq3KnToS2s-2s.png',
                    './mon_202003/20/-mpnxjQ5-htboKnToS2s-2s.png',
                    './mon_202003/20/-mpnxjQ5-bsnpKiToS2s-2s.png',
                    './mon_202106/23/-mpnxjQ2o-cct8KtToS2s-2s.png',
                    './mon_202106/23/-mpnxjQ2o-ctk7KtToS2s-2s.png',
                    './mon_202106/23/-mpnxjQ2o-eljiKuToS2s-2s.png',
                    './mon_202106/23/-mpnxjQ2o-6kkpKtToS2s-2s.png',
                    './mon_202106/23/-mpnxjQ2o-8ecqKvToS2s-2s.png',
                ],
            text:
                [
                    '比心',
                    '吃瓜',
                    '打call',
                    '冲鸭',
                    '呆',
                    '得意',
                    '干杯',
                    '害羞',
                    '黑化',
                    '精神抖擞',
                    '哭',
                    '卖萌',
                    '小钱钱',
                    '色',
                    '认真',
                    '睡觉',
                    '晚安',
                    '无语',
                    '嫌弃',
                    '小公主',
                    '耶',
                    '疑惑',
                    '震惊',
                    '醉',
                    '期待',
                    '心虚',
                    '叶！',
                    'S',
                    'A',
                    'B',
                    'C',
                    'D',
                ],
        },

    ];


    // 创建浮动窗口
    const createSettingsWindow = () => {

        const settingsWindow = document.createElement('div');
        settingsWindow.style.position = 'fixed';
        settingsWindow.style.top = '50px';
        settingsWindow.style.right = '50px';
        settingsWindow.style.width = '300px';
        settingsWindow.style.backgroundColor = '#e9e6de';
        settingsWindow.style.padding = '20px';
        settingsWindow.style.border = '1px solid #000';
        settingsWindow.style.zIndex = '999';

        const closeBtn = document.createElement('button');
        closeBtn.innerText = '关闭';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '0px';
        closeBtn.style.right = '10px';
        closeBtn.onclick = () => {
            document.body.removeChild(settingsWindow);
        };
        settingsWindow.appendChild(closeBtn);

        const table = document.createElement('table');
        table.style.width = '100%';

        iconSets.forEach((iconSet, index) => {
            const row = table.insertRow();

            const nameCell = row.insertCell(0);
            nameCell.innerText = iconSet.name;

            const enableCell = row.insertCell(1);
            const enableCheckbox = document.createElement('input');
            enableCheckbox.type = 'checkbox';
            enableCheckbox.checked = true; // 默认全选
            enableCell.appendChild(enableCheckbox);

            // 为复选框添加事件监听器，以更新设置中对应图片集的启用状态并显示状态消息
            enableCheckbox.addEventListener('change', (event) => {
                const iconSetName = iconSet.name;
                const isEnabled = event.target.checked;

                // 更新存储的图片集启用状态
                iconSetStatus[iconSet.name] = isEnabled;
                GM_setValue('iconSetStatus', iconSetStatus);

                const statusMessage = document.createElement('div');
                statusMessage.textContent = `${iconSetName}已${isEnabled ? '启用' : '禁用'}`;
                statusMessage.style.position = 'fixed';
                statusMessage.style.top = '10px';
                statusMessage.style.left = '10px';
                statusMessage.style.backgroundColor = isEnabled ? '#4CAF50' : '#f44336';  // 绿色表示启用，红色表示禁用
                statusMessage.style.padding = '10px';
                statusMessage.style.borderRadius = '5px';
                statusMessage.style.transition = 'opacity 1s ease-in-out';

                document.body.appendChild(statusMessage);

                setTimeout(() => {
                    statusMessage.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(statusMessage);
                    }, 1000); // 渐隐动画持续时间为1秒
                }, 1500); // 显示1.5秒后开始渐隐
            });

            enableCheckbox.checked = iconSetStatus[iconSet.name];
        });

        settingsWindow.appendChild(table);

        document.body.appendChild(settingsWindow);
    };

    // 注册设置按钮，点击时打开浮动窗口
    GM_registerMenuCommand('设置', () => {

        createSettingsWindow();
    });

    // 修改iconSetStatus的初始化
    let iconSetStatus = GM_getValue('iconSetStatus') || {
        'xx表情包': true,
        'xxx表情包': true,
        'xxxx表情': true,
    };

    // 根据iconSets数组的内容自动更新iconSetStatus对象
    const updateIconSetStatus = () => {
        const currentIconSetNames = iconSets.map(iconSet => iconSet.name);
        const currentIconSetStatusNames = Object.keys(iconSetStatus);

        const iconSetNamesToAdd = currentIconSetNames.filter(name => !currentIconSetStatusNames.includes(name));
        iconSetNamesToAdd.forEach(name => {
            iconSetStatus[name] = true; // 默认设为启用
        });

        const iconSetNamesToRemove = currentIconSetStatusNames.filter(name => !currentIconSetNames.includes(name));
        iconSetNamesToRemove.forEach(name => {
            delete iconSetStatus[name];
        });

        // 保存更新后的iconSetStatus对象
        GM_setValue('iconSetStatus', iconSetStatus);
    };

    updateIconSetStatus();

    const loadIcons = (loaded) => {
        if (loaded) return;

        const { correctAttachUrl } = ui;
        const tabs = poster.selectSmilesw._.__c.firstElementChild;
        const contents = poster.selectSmilesw._.__c.lastElementChild;

        iconSets.forEach((set) => {
            const { name, data, text, credit } = set;
            const pageSize = 60;
            const pageCount = Math.ceil(data.length / pageSize);

            for (let i = 0; i < pageCount; i++) {
                const tab = document.createElement('BUTTON');
                const content = document.createElement('DIV');

                tab.className = 'block_txt_big';
                tab.innerText = `${name}${pageCount > 1 ? `(${i + 1}/${pageCount})` : ''}`;
                // 检查设置中该图片集的启用状态并添加或移除对应的按钮和事件
                const isIconSetStatus = iconSetStatus[set.name];
                if (isIconSetStatus) {
                    tab.onclick = () => {
                        tabs.firstChild.textContent = credit || '';

                        contents.childNodes.forEach((c) => {
                            c.style.display = c !== content ? 'none' : '';
                        });

                        if (content.childNodes.length === 0) {
                            data.slice(pageSize * i, pageSize * (i + 1)).forEach((iconPath, index) => {
                                const icon = document.createElement('IMG');
                                icon.src = correctAttachUrl(iconPath);
                                icon.style = 'max-height: 100px';
                                icon.title = text ? text[index] : '';
                                icon.onclick = () => {
                                    poster.selectSmilesw._.hide();
                                    poster.addText(`[img]${iconPath}[/img]`);
                                };

                                content.appendChild(icon);
                            });
                        }
                    };

                    tabs.appendChild(tab);
                    contents.appendChild(content);
                }
            }
        });
    };

    hookFunction(poster, 'selectSmiles', (returnValue) => loadIcons(returnValue));
})(commonui, postfunc);

// ==UserScript==
// @name         少女前线2追放表情包
// @namespace    https://greasyfork.org/users/1302103
// @version      1.3.000
// @icon         http://bbs.nga.cn/favicon.ico
// @description  少前表情脚本（加入追放表情的修改版本）
// @author       魔改：P*4
// @include      /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn|ngabbs\.com)/.+/
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @connect      github.com
// @connect      raw.githubusercontent.com
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

    let iconSets = [];

    // 获取JSON数据的函数
    const fetchIconSets = () => {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/xyixc/vvvAvxx-L1/main/emoji.json", // 替换为你的JSON数据URL
            onload: function(response) {
                if (response.status === 200) {
                    iconSets = JSON.parse(response.responseText);
                    updateIconSetStatus();
                } else {
                    console.error("Failed to fetch icon sets");
                }
            },
            onerror: function() {
                console.error("Error occurred while fetching icon sets");
            }
        });
    };

    fetchIconSets();

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

        // 添加检查更新按钮
        const updateButton = document.createElement('button');
        updateButton.innerText = '检查更新';
        updateButton.style.marginTop = '20px';
        updateButton.onclick = () => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/xyixc/vvvAvxx-L1/main/emoji.json',
                onload: (response) => {
                    const newIconSets = JSON.parse(response.responseText);
                    const isUpdated = JSON.stringify(iconSets) !== JSON.stringify(newIconSets);

                    if (isUpdated) {
                        iconSets = newIconSets;
                        GM_setValue('iconSets', JSON.stringify(newIconSets)); // 使用不同的键名存储新数据
                        location.reload();
                    }
                },
                onerror: (error) => {
                    console.error('请求失败:', error);
                }
            });
        };
        settingsWindow.appendChild(updateButton);


        document.body.appendChild(settingsWindow);
    };

    // 注册设置按钮，点击时打开浮动窗口
    GM_registerMenuCommand('设置', () => {

        createSettingsWindow();
    });

    // 修改iconSetStatus的初始化
    let iconSetStatus = GM_getValue('iconSetStatus') || {
        '追放表情包5': true,
        '追放表情包6': true,
        '16Lab表情': true,
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
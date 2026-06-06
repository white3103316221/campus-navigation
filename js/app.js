/**
 * 华南农业大学校园导航 - 主应用逻辑
 * 基于 高德地图 JS API v2.0
 */

let map, markers = [], routePolyline;
let currentPoiId = null;
let routeStart = null, routeEnd = null;
let currentCategory = 'all';

const categoryColors = {
    scenic: '#e74c3c', teaching: '#2980b9', library: '#8e44ad',
    canteen: '#e67e22', dormitory: '#2c3e50', sport: '#27ae60',
    gate: '#795548', transport: '#00acc1', hospital: '#e74c3c'
};
const categoryNames = {
    scenic: '景点', teaching: '教学楼', library: '图书馆',
    canteen: '食堂', dormitory: '宿舍区', sport: '运动场',
    gate: '校门', transport: '交通', hospital: '医疗'
};

function getCategoryEmoji(cat) {
    const m = { scenic:'🌸', teaching:'📚', library:'📖', canteen:'🍽️',
                dormitory:'🏠', sport:'⚽', gate:'🚪', transport:'🚇', hospital:'🏥' };
    return m[cat] || '📍';
}

// ===== POI数据（已直接使用GCJ-02高德坐标，无需转换） =====
// POI_DATA 中的坐标已通过高德官方API转为GCJ-02格式
// 数据格式: [lat, lng]，传给高德时交换为 [lng, lat]

// ===== 初始化地图 =====
function initMap() {
    // 转换校园中心坐标 WGS-84 → GCJ-02
    const centerWgs = CAMPUS_INFO.center;  // [lat, lng]
    const centerGcj = COORD.wgs84_to_gcj02(centerWgs[0], centerWgs[1]); // [lat, lng]
    const center = [centerGcj[1], centerGcj[0]]; // 高德格式 [lng, lat]

    map = new AMap.Map('map', {
        center: center,
        zoom: 16,
        minZoom: 14,
        maxZoom: 18,
        resizeEnable: true,
        mapStyle: 'amap://styles/light'    // 高德亮色地图风格
    });

    // 添加控件
    try {
        AMap.plugin(['AMap.ToolBar'], function() {
            map.addControl(new AMap.ToolBar({ position: 'LB' }));
        });
    } catch(e) {
        console.warn('工具栏加载失败（不影响地图使用）:', e);
    }

    // 校园范围多边形（扩展覆盖华山区、泰山区、启林区）
    const campusPath = [
        [113.3380, 23.1570], // 西南门
        [113.3370, 23.1660], // 西门
        [113.3460, 23.1760], // 启林北西北
        [113.3560, 23.1750], // 启林北东北
        [113.3680, 23.1650], // 泰山东
        [113.3660, 23.1500], // 泰山南
        [113.3580, 23.1460], // 树木园南
        [113.3450, 23.1480], // 洪泽湖南
    ].map(p => COORD.wgs84_to_gcj02(p[1], p[0]).reverse());

    new AMap.Polygon({
        path: campusPath,
        fillColor: '#1a6b3c',
        fillOpacity: 0.06,
        strokeColor: '#1a6b3c',
        strokeWeight: 2,
        strokeOpacity: 0.4,
        strokeStyle: 'dashed'
    }).setMap(map);

    // 限制视图范围
    const bounds = new AMap.Bounds(
        COORD.wgs84_to_gcj02(23.140, 113.330).reverse(),
        COORD.wgs84_to_gcj02(23.180, 113.375).reverse()
    );
    map.setBounds(bounds);

    map.on('click', closeSearchResults);
}

// ===== 创建自定义标记 =====
function createMarker(poi) {
    const [lat, lng] = poi.coords; // GCJ-02 [lat, lng]（从 WGS-84 转换得来）
    const color = categoryColors[poi.category] || '#1a6b3c';
    const emoji = getCategoryEmoji(poi.category);

    // 完全内联样式，不依赖 CSS 类（解决 AMap 自定义标记样式丢失问题）
    const marker = new AMap.Marker({
        position: [lng, lat],   // 高德需要 [经度, 纬度]
        content: `<div style="
            width:40px; height:40px; border-radius:50%;
            background:${color};
            display:flex; align-items:center; justify-content:center;
            font-size:20px; line-height:1;
            border:3px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,0.3);
            cursor:pointer;
            transition:transform 0.2s;
            box-sizing:border-box;
        ">${emoji}</div>`,
        offset: new AMap.Pixel(-20, -20),
        zIndex: 101
    });

    marker.poiData = poi;
    marker.on('click', () => showPoiDetail(poi.id));

    // 悬停显示名称
    marker.setLabel({
        content: `<div style="
            background:rgba(0,0,0,0.75); color:white;
            padding:2px 8px; border-radius:4px;
            font-size:12px; white-space:nowrap;
        ">${poi.name}</div>`,
        direction: 'top',
        offset: new AMap.Pixel(0, -5)
    });

    return marker;
}

// ===== 渲染标记 =====
function renderMarkers(category) {
    // 清除旧标记
    if (markers.length) {
        map.remove(markers);
        markers = [];
    }

    const filtered = category === 'all'
        ? POI_DATA : POI_DATA.filter(p => p.category === category);

    filtered.forEach(poi => {
        const marker = createMarker(poi);
        marker.setMap(map);
        markers.push(marker);
    });
}

// ===== 显示 POI 详情 =====
function showPoiDetail(poiId) {
    const poi = POI_DATA.find(p => p.id === poiId);
    if (!poi) return;

    currentPoiId = poiId;
    switchPanel('detail');

    document.getElementById('poi-icon').textContent = getCategoryEmoji(poi.category);
    document.getElementById('poi-name').textContent = poi.name;
    document.getElementById('poi-badge').textContent = categoryNames[poi.category] || '其他';
    document.getElementById('poi-desc').textContent = poi.desc;

    const tipEl = document.getElementById('poi-tip');
    if (poi.tips) { tipEl.style.display = 'block'; tipEl.querySelector('.poi-detail-text').textContent = poi.tips; }
    else { tipEl.style.display = 'none'; }

    const hoursEl = document.getElementById('poi-hours');
    if (poi.openingHours) { hoursEl.style.display = 'block'; hoursEl.querySelector('.poi-detail-text').textContent = poi.openingHours; }
    else { hoursEl.style.display = 'none'; }

    // 高亮列表项
    document.querySelectorAll('.poi-list-item').forEach(el => el.classList.remove('active'));
    const li = document.querySelector(`.poi-list-item[data-id="${poiId}"]`);
    if (li) li.classList.add('active');

    // 飞行到标记
    map.setCenter([poi.coords[1], poi.coords[0]], true); // 高德需要 [lng, lat]
    if (map.getZoom() < 16) map.setZoom(16, true);
}

// ===== 面板切换 =====
function switchPanel(panel) {
    document.getElementById('panel-welcome').style.display = panel === 'welcome' ? 'block' : 'none';
    document.getElementById('panel-list').style.display = panel === 'list' ? 'block' : 'none';
    document.getElementById('panel-detail').style.display = panel === 'detail' ? 'block' : 'none';
    document.getElementById('panel-route').style.display = panel === 'route' ? 'block' : 'none';
}

// ===== 显示 POI 列表 =====
function showPoiList(category) {
    currentCategory = category;
    currentPoiId = null;
    switchPanel('list');

    const listEl = document.getElementById('poi-list-container');
    const filtered = category === 'all' ? POI_DATA : POI_DATA.filter(p => p.category === category);
    const catName = category === 'all' ? '全部' : (categoryNames[category] || '');
    document.getElementById('list-title').textContent = `${catName}（${filtered.length}）`;

    listEl.innerHTML = filtered.map(p => `
        <div class="poi-list-item" data-id="${p.id}">
            <div class="poi-list-icon">${getCategoryEmoji(p.category)}</div>
            <div class="poi-list-info">
                <div class="poi-list-name">${p.name}</div>
                <div class="poi-list-cat">${categoryNames[p.category] || '其他'}</div>
            </div>
            <div class="poi-list-arrow">›</div>
        </div>
    `).join('');

    listEl.querySelectorAll('.poi-list-item').forEach(el => {
        el.addEventListener('click', () => showPoiDetail(el.dataset.id));
    });

    renderMarkers(category);
}

// ===== 显示欢迎面板 =====
function showWelcome() {
    switchPanel('welcome');
    document.getElementById('stat-poi').textContent = POI_DATA.length;
    document.getElementById('stat-category').textContent = POI_CATEGORIES.length - 1;
    document.getElementById('stat-roads').textContent = CAMPUS_ROADS.length;
}

// ===== 搜索功能 =====
function searchPoi(query) {
    const resultsEl = document.getElementById('search-results');
    if (!query || query.trim().length === 0) {
        resultsEl.classList.remove('show');
        return;
    }

    const q = query.trim().toLowerCase();
    const results = POI_DATA.filter(p =>
        p.name.includes(q) || p.desc.includes(q) ||
        (categoryNames[p.category] || '').includes(q)
    ).slice(0, 8);

    if (results.length === 0) {
        resultsEl.innerHTML = `<div style="padding:16px;text-align:center;color:#999;font-size:14px;">😕 未找到"${query.trim()}"</div>`;
    } else {
        resultsEl.innerHTML = results.map(p => `
            <div class="search-result-item" data-poi-id="${p.id}">
                <span class="search-result-icon">${getCategoryEmoji(p.category)}</span>
                <div>
                    <div class="search-result-name">${p.name}</div>
                    <div class="search-result-cat">${categoryNames[p.category] || '其他'}</div>
                </div>
            </div>
        `).join('');

        resultsEl.querySelectorAll('.search-result-item').forEach(el => {
            el.addEventListener('click', () => searchSelect(el.dataset.poiId));
        });
    }
    resultsEl.classList.add('show');
}

function searchSelect(poiId) {
    closeSearchResults();
    document.getElementById('search-input').value = '';
    const poi = POI_DATA.find(p => p.id === poiId);
    if (poi) switchCategory(poi.category);
    showPoiDetail(poiId);
}

function closeSearchResults() {
    document.getElementById('search-results').classList.remove('show');
}

// ===== 分类筛选 =====
function switchCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === category);
    });
    showPoiList(category);
}

// ===== 路径规划 =====
function startRoute(startId) {
    routeStart = startId;
    routeEnd = null;
    switchPanel('route');

    const startPoi = POI_DATA.find(p => p.id === routeStart);
    document.getElementById('route-start').textContent = startPoi
        ? `${getCategoryEmoji(startPoi.category)} ${startPoi.name}` : '选择起点';

    const routeListEl = document.getElementById('route-end-select');
    routeListEl.innerHTML = POI_DATA
        .filter(p => p.id !== routeStart)
        .map(p => `
            <div class="route-select-item" data-end-id="${p.id}">
                <div class="route-select-dot end"></div>
                <div class="route-select-info">
                    <div class="route-select-label">终点</div>
                    <div class="route-select-name">${getCategoryEmoji(p.category)} ${p.name}</div>
                </div>
            </div>
        `).join('');

    routeListEl.querySelectorAll('.route-select-item').forEach(el => {
        el.addEventListener('click', () => selectRouteEnd(el.dataset.endId));
    });

    document.getElementById('route-result').style.display = 'none';
    clearRouteLine();
}

function selectRouteEnd(endId) {
    routeEnd = endId;
    calculateAndShowRoute();
}

function calculateAndShowRoute() {
    if (!routeStart || !routeEnd) return;

    const path = findShortestPath(routeStart, routeEnd);
    const resultEl = document.getElementById('route-result');

    if (!path || path.length < 2) {
        resultEl.innerHTML = `<div class="route-info-box"><span>⚠️ 未找到连通路径</span></div>`;
        resultEl.style.display = 'block';
        return;
    }

    // 计算总距离，收集坐标（高德格式 [lng, lat]）
    let totalDist = 0;
    const coords = [];
    for (let i = 0; i < path.length; i++) {
        const poi = POI_DATA.find(p => p.id === path[i]);
        if (poi) coords.push([poi.coords[1], poi.coords[0]]); // 转换 [lat,lng] → [lng,lat]
        if (i > 0) {
            const road = CAMPUS_ROADS.find(r =>
                (r.from === path[i-1] && r.to === path[i]) ||
                (r.from === path[i] && r.to === path[i-1])
            );
            if (road) totalDist += road.dist;
        }
    }

    drawRouteLine(coords);

    const startPoi = POI_DATA.find(p => p.id === routeStart);
    const endPoi = POI_DATA.find(p => p.id === routeEnd);

    resultEl.innerHTML = `
        <div class="route-info-box">
            <div>
                <div style="font-size:13px;color:#999;">
                    ${getCategoryEmoji(startPoi.category)} ${startPoi.name}
                    → ${getCategoryEmoji(endPoi.category)} ${endPoi.name}
                </div>
                <div class="route-dist">${totalDist > 1000 ? (totalDist/1000).toFixed(1) + ' km' : totalDist + ' m'}</div>
                <div class="route-dist-label">步行约 ${Math.ceil(totalDist / 80)} 分钟</div>
            </div>
            <div>
                <div style="font-size:13px;color:#999;">途经 ${path.length} 个地点</div>
            </div>
        </div>
        <div style="margin-top:10px;font-size:12px;color:#999;line-height:1.6;">
            路线：${path.map(id => { const p = POI_DATA.find(poi => poi.id === id); return p ? p.name : id; }).join(' → ')}
        </div>
        <div style="margin-top:12px;">
            <button class="route-btn-clear" onclick="clearRoute()">清除路线</button>
        </div>
    `;
    resultEl.style.display = 'block';

    // 缩放至路线范围
    map.setFitView(null, false, [60, 60, 60, 60]);
}

// ===== 最短路径算法 (Dijkstra) =====
function findShortestPath(startId, endId) {
    const graph = {};
    CAMPUS_ROADS.forEach(r => {
        if (!graph[r.from]) graph[r.from] = [];
        if (!graph[r.to]) graph[r.to] = [];
        graph[r.from].push({ node: r.to, dist: r.dist });
        graph[r.to].push({ node: r.from, dist: r.dist });
    });

    const dist = {}, prev = {}, visited = new Set();
    const allNodes = new Set([...Object.keys(graph), startId, endId]);
    allNodes.forEach(n => { dist[n] = Infinity; prev[n] = null; });
    dist[startId] = 0;

    while (visited.size < allNodes.size) {
        let minDist = Infinity, minNode = null;
        allNodes.forEach(n => {
            if (!visited.has(n) && dist[n] < minDist) { minDist = dist[n]; minNode = n; }
        });
        if (!minNode || minDist === Infinity) break;
        if (minNode === endId) break;
        visited.add(minNode);
        (graph[minNode] || []).forEach(neighbor => {
            if (!visited.has(neighbor.node)) {
                const nd = dist[minNode] + neighbor.dist;
                if (nd < dist[neighbor.node]) { dist[neighbor.node] = nd; prev[neighbor.node] = minNode; }
            }
        });
    }

    if (dist[endId] === Infinity) return null;
    const path = [];
    let curr = endId;
    while (curr) { path.unshift(curr); curr = prev[curr]; }
    return path.length >= 2 ? path : null;
}

// ===== 绘制路径线 =====
function drawRouteLine(coords) {
    clearRouteLine();
    if (coords.length < 2) return;

    routePolyline = new AMap.Polyline({
        path: coords,
        strokeColor: '#c0392b',
        strokeWeight: 5,
        strokeOpacity: 0.85,
        strokeStyle: 'dashed',
        lineJoin: 'round'
    });
    routePolyline.setMap(map);

    // 起点终点标记
    const startIcon = new AMap.Marker({
        position: coords[0],
        content: '<div style="width:16px;height:16px;background:#e74c3c;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>',
        offset: new AMap.Pixel(-8, -8),
        zIndex: 120
    });
    startIcon.setMap(map);

    const endIcon = new AMap.Marker({
        position: coords[coords.length - 1],
        content: '<div style="width:16px;height:16px;background:#1a6b3c;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>',
        offset: new AMap.Pixel(-8, -8),
        zIndex: 120
    });
    endIcon.setMap(map);

    // 存起来方便清除
    routePolyline._startMarker = startIcon;
    routePolyline._endMarker = endIcon;
}

function clearRouteLine() {
    if (routePolyline) {
        map.remove(routePolyline);
        if (routePolyline._startMarker) map.remove(routePolyline._startMarker);
        if (routePolyline._endMarker) map.remove(routePolyline._endMarker);
        routePolyline = null;
    }
}

function clearRoute() {
    clearRouteLine();
    routeStart = routeEnd = null;
    switchPanel('list');
    showPoiList(currentCategory);
}

// ===== 初始化 =====
function bootApp() {
    if (typeof AMap === 'undefined') {
        document.getElementById('map').innerHTML =
            '<div style="padding:40px;text-align:center;font-size:16px;color:#999;">⏳ 高德地图加载失败，请刷新页面或检查网络</div>';
        return;
    }

    initMap();

    // 渲染分类按钮
    const categoryBar = document.getElementById('category-bar');
    POI_CATEGORIES.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `category-btn ${cat.id === 'all' ? 'active' : ''}`;
        btn.dataset.cat = cat.id;
        btn.innerHTML = `${cat.icon} ${cat.name}`;
        btn.onclick = () => switchCategory(cat.id);
        categoryBar.appendChild(btn);
    });

    showWelcome();
    renderMarkers('all');

    // 搜索防抖
    let timer;
    document.getElementById('search-input').addEventListener('input', function(e) {
        clearTimeout(timer);
        timer = setTimeout(() => searchPoi(e.target.value), 200);
    });
    document.getElementById('search-input').addEventListener('blur', () => setTimeout(closeSearchResults, 200));
    document.getElementById('search-input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const first = document.querySelector('.search-result-item');
            if (first) first.click();
        }
    });

    console.log('🌿 华农校园导航（高德地图版）已加载，POI数：' + POI_DATA.length);
}

// ===== 启动应用 =====
document.addEventListener('DOMContentLoaded', function() {
    // 高德 SDK 可能还在加载中，轮询等待
    var waitTimer = setInterval(function() {
        if (typeof AMap !== 'undefined') {
            clearInterval(waitTimer);
            bootApp();
        }
    }, 100);
    // 10秒超时
    setTimeout(function() {
        if (typeof AMap === 'undefined') {
            clearInterval(waitTimer);
            document.getElementById('map').innerHTML =
                '<div style="padding:60px;text-align:center;font-size:16px;color:#999;">⏳ 高德地图加载超时，请检查网络或API Key是否有效</div>';
        }
    }, 10000);
});

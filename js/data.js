/**
 * 华南农业大学校园导航 - POI数据
 * 坐标系: GCJ-02 (火星坐标，高德地图直接使用)
 * 坐标来源: 高德坐标拾取器 https://lbs.amap.com/tools/picker
 */

const CAMPUS_INFO = {
    name: '华南农业大学',
    nameEn: 'South China Agricultural University',
    center: [23.1580, 113.3480],
    zoom: 15,
    address: '广东省广州市天河区五山路483号',
    area: '约2.95 km²',
    description: '华南农业大学（SCAU）位于广州市天河区，校园以"五湖四海一片林"著称，\
拥有优美的自然景观和丰富的历史建筑。校园横跨华南快速干线，分为华山区、泰山区和启林区三大区域。'
};

const POI_CATEGORIES = [
    { id: 'all', name: '全部', icon: '📍' },
    { id: 'scenic', name: '景点', icon: '🌸' },
    { id: 'teaching', name: '教学楼', icon: '📚' },
    { id: 'library', name: '图书馆', icon: '📖' },
    { id: 'canteen', name: '食堂', icon: '🍽️' },
    { id: 'dormitory', name: '宿舍区', icon: '🏠' },
    { id: 'sport', name: '运动场', icon: '⚽' },
    { id: 'gate', name: '校门', icon: '🚪' },
    { id: 'transport', name: '交通', icon: '🚇' },
    { id: 'hospital', name: '医疗', icon: '🏥' }
];

const POI_DATA = [
    // ========== 景点 ==========
    {
        id: 'hongmantang', name: '红满堂', category: 'scenic',
        coords: [23.156409, 113.351819],
        desc: '华南农业大学标志性历史建筑，始建于上世纪50年代，是典型的岭南建筑风格。红满堂原名"红旗馆"，现为学校重要会议和活动场所。',
        tips: '红满堂前的大草坪非常适合拍照打卡。',
        openingHours: '仅限校外重大活动开放'
    },
    {
        id: 'building5', name: '5号楼（校史馆）', category: 'scenic',
        coords: [23.157238, 113.349514],
        desc: '原国立中山大学理学院旧址，现为华南农业大学校史展览馆、丁颖纪念馆、卢永根先进事迹陈列展和艺术馆。建筑具有民国风格，是校园最具历史价值的建筑之一。',
        tips: '校史馆内有丁颖院士和卢永根院士的珍贵展品。',
        openingHours: '周一至周五 9:00-17:00'
    },
    {
        id: 'zhumingcaohai', name: '竹铭草海', category: 'scenic',
        coords: [23.158266, 113.350719],
        desc: '华山区最大的草坪，因丁颖院士字"竹铭"而得名。对面是第一教学楼，是学生休闲娱乐、社团活动的重要场所。',
        tips: '傍晚时分阳光洒在草坪上非常美，适合野餐和放风筝。'
    },
    {
        id: 'bauhinia_bridge', name: '紫荆桥', category: 'scenic',
        coords: [23.153110, 113.363005],
        desc: '连接主校区与泰山区的桥梁，长167米，宽19米。每年春季紫荆花盛开时，桥上紫荆花簇拥，是华农最著名的网红打卡点之一。',
        tips: '每年3-4月紫荆花季是最佳观赏时间，花开时整座桥被粉色花海覆盖。'
    },
    {
        id: 'arboretum', name: '树木园', category: 'scenic',
        coords: [23.153562, 113.359917],
        desc: '华南农业大学树木园，占地面积约200亩，收集有上千种植物品种，是教学科研的重要基地，也是师生休闲的好去处。',
        tips: '园内有珍稀植物标本，适合植物爱好者探索。'
    },
    {
        id: 'dingying_statue', name: '丁颖像', category: 'scenic',
        coords: [23.159112, 113.350348],
        desc: '丁颖（1888-1964），中国现代稻作科学奠基人，华南农学院首任院长。铜像坐落于第一教学楼前，是华农师生敬仰的精神地标。',
        tips: '丁颖院士被誉为"中国稻作学之父"，每年校庆日都有师生前来献花。'
    },
    {
        id: 'museum_agri', name: '华南农业博物馆', category: 'scenic',
        coords: [23.157294, 113.351840],
        desc: '展示华南地区农业发展历程和农业文化的专题博物馆，馆藏丰富，包括传统农具、农作物标本、农业历史文献等。',
        tips: '免费开放，适合了解农业文化历史。',
        openingHours: '周二至周日 9:00-17:00'
    },
    {
        id: 'poyang_lake', name: '鄱阳湖', category: 'scenic',
        coords: [23.154376, 113.354889],
        desc: '校园"五湖"之一，位于泰山区西侧，湖面碧波荡漾，周围绿树成荫，是师生散步休闲的好去处。',
        tips: '湖边有小径可以散步，清晨常有学生在此晨读。'
    },
    {
        id: 'hongze_lake', name: '洪泽湖', category: 'scenic',
        coords: [23.155715, 113.352371],
        desc: '校园"五湖"之一，位于主校区核心区域，湖中有喷泉，周围有凉亭和长椅，是华农最具标志性的景观湖。',
        tips: '湖边的凉亭是拍校园照的热门地点，晚上灯光映照湖面很美。'
    },
    {
        id: 'west_lake', name: '西湖', category: 'scenic',
        coords: [23.160639, 113.346209],
        desc: '校园"五湖"之一，位于华山区，环境清幽，湖边绿道是跑步和散步的好路线。',
        tips: '湖周围有环湖步道，傍晚慢跑非常舒适。'
    },
    {
        id: 'sanjiaoshi', name: '三角市（华农市场）', category: 'scenic',
        coords: [23.156932, 113.355415],
        desc: '华农校内的综合市场，有水果店、超市、理发店等，是学生日常生活采购的重要场所。',
        tips: '这里的华农酸奶非常出名，来华农必尝。'
    },

    // ========== 教学楼 ==========
    {
        id: 'teaching1', name: '第一教学楼', category: 'teaching',
        coords: [23.159112, 113.350348],
        desc: '华山区最古老的教学楼，门前矗立着丁颖院士铜像，对面是竹铭草海。教一具有浓厚的历史气息。',
        tips: '教一的教室保留了老式风格，在此上课别有一番风味。'
    },
    {
        id: 'teaching2', name: '第二教学楼', category: 'teaching',
        coords: [23.158654, 113.347218],
        desc: '现为水利与土木工程学院院楼，位于华山区西侧，建筑风格简约现代。'
    },
    {
        id: 'teaching3', name: '第三教学楼', category: 'teaching',
        coords: [23.158277, 113.352023],
        desc: '位于主校区核心区域，靠近图书馆总馆，是学生上课和自习的主要场所之一。'
    },
    {
        id: 'teaching4', name: '第四教学楼', category: 'teaching',
        coords: [23.151906, 113.365413],
        desc: '泰山区主教学楼，拥有网红大阶梯教室（107/108/109），楼顶有标志性钟楼。教四三楼设有图书馆泰山区分馆。',
        tips: '教四的钟楼是泰山区的标志性建筑，大阶梯教室可容纳数百人。'
    },
    {
        id: 'teaching5', name: '第五教学楼', category: 'teaching',
        coords: [23.160453, 113.365860],
        desc: '启林区主教学楼，分A/B/C/D四栋。A栋为外国语学院院楼，配有观光电梯。教五A栋7楼设有图书馆启林分馆。',
        tips: '五教A栋的观光电梯可以俯瞰启林区全景。'
    },
    {
        id: 'lab_east', name: '东区实验楼', category: 'teaching',
        coords: [23.152731, 113.365466],
        desc: '位于第四教学楼隔壁，是学生上实验课和英语上机课的主要场所。'
    },
    {
        id: 'admin_building', name: '行政楼', category: 'teaching',
        coords: [23.155673, 113.353718],
        desc: '学校行政办公核心区域，校领导办公室及主要行政部门所在地。',
        tips: '办理行政事务需要前往此处。'
    },

    // ========== 图书馆 ==========
    {
        id: 'lib_main', name: '图书馆总馆', category: 'library',
        coords: [23.157631, 113.353689],
        desc: '华南农业大学图书馆总馆，藏书丰富，设有多个阅览室和自习区，是学生自习和查阅资料的首选之地。',
        tips: '考试周期间座位非常紧张，建议早上早点来占座。',
        openingHours: '周一至周日 7:30-22:00'
    },

    // ========== 食堂 ==========
    {
        id: 'xiyuan', name: '西园饭堂', category: 'canteen',
        coords: [23.161231, 113.347286],
        desc: '华山区网红餐厅，三楼有夜景露台，就餐环境一流。提供多种菜式，是华农人气最高的食堂之一。',
        tips: '三楼的夜景露台非常适合晚餐，可以边吃边看校园夜景。'
    },
    {
        id: 'zhiyuan', name: '芷园饭堂', category: 'canteen',
        coords: [23.153306, 113.366019],
        desc: '泰山区食堂，共三层，以烤鱼、猪肚鸡和夜宵档闻名，被誉为"每到泰山胖三斤"。',
        tips: '一楼有夜宵档，晚上下课后可以去吃烤鱼和烧烤。'
    },
    {
        id: 'heyuan', name: '荷园饭堂', category: 'canteen',
        coords: [23.160475, 113.367775],
        desc: '启林南区食堂，菜式丰富多样，价格实惠，深受启林区学生喜爱。'
    },
    {
        id: 'daoxiangyuan', name: '稻香园饭堂', category: 'canteen',
        coords: [23.163324, 113.370245],
        desc: '启林北区食堂，靠近启林北宿舍区，方便住在启林北的同学就餐。'
    },
    {
        id: 'lvrongyuan', name: '绿榕园饭堂', category: 'canteen',
        coords: [23.156229, 113.354986],
        desc: '位于主校区三角市附近，菜式多样，深受师生欢迎。靠近图书馆总馆和行政楼。',
        tips: '午餐时间人较多，建议错峰就餐。'
    },

    // ========== 宿舍区 ==========
    {
        id: 'dorm_huashan', name: '华山宿舍区', category: 'dormitory',
        coords: [23.160043, 113.346839],
        desc: '华山区学生宿舍（1-15栋），主要居住男生较多的学院，靠近西园饭堂和华山运动场。'
    },
    {
        id: 'dorm_taishan', name: '泰山宿舍区', category: 'dormitory',
        coords: [23.152827, 113.368659],
        desc: '泰山区学生宿舍（1-24栋），新生数量最多的宿舍区，靠近芷园饭堂和东区运动场，邻近汇景北公交总站。',
        tips: '泰山区是华农最大的宿舍区，生活配套设施完善。'
    },
    {
        id: 'dorm_qilin_south', name: '启林南宿舍区', category: 'dormitory',
        coords: [23.159422, 113.367410],
        desc: '启林南区学生宿舍，靠近荷园饭堂和启林运动场。'
    },
    {
        id: 'dorm_qilin_north', name: '启林北宿舍区', category: 'dormitory',
        coords: [23.162211, 113.370237],
        desc: '启林北区学生宿舍，靠近稻香园饭堂，环境较为安静。以车陂涌为界与启林南分开。'
    },

    // ========== 运动场 ==========
    {
        id: 'sport_huashan', name: '华山运动场', category: 'sport',
        coords: [23.160091, 113.344931],
        desc: '华山区运动场，包含田径场和足球场，旁边有华山游泳池，是华山区学生运动的主要场所。'
    },
    {
        id: 'sport_east', name: '东区运动场', category: 'sport',
        coords: [23.154156, 113.364810],
        desc: '泰山区运动场，位于第四教学楼对面，包含标准田径场、足球场和篮球场。',
        tips: '晚上运动场灯光充足，是夜跑的好去处。'
    },
    {
        id: 'sport_qilin', name: '启林运动场', category: 'sport',
        coords: [23.158810, 113.369129],
        desc: '启林区运动场，包含足球场和篮球场，为启林区学生提供运动健身场所。'
    },
    {
        id: 'tianjiabing_gym', name: '田家炳体育馆', category: 'sport',
        coords: [23.155239, 113.357564],
        desc: '位于主校区的大型体育馆，设有篮球场、羽毛球场、乒乓球室等，是师生室内运动的主要场所。',
        tips: '晚上灯光充足，需提前预约场地。'
    },

    // ========== 校门 ==========
    {
        id: 'gate_southwest', name: '西南门（正门）', category: 'gate',
        coords: [23.153308, 113.351775],
        desc: '华南农业大学正门，位于五山路，是学校主要人行入口，门口有"华南农业大学"校名牌坊。地铁3号线五山站A出口即到。',
        tips: '正门前有公交站和地铁站，交通最便利。'
    },
    {
        id: 'gate_west', name: '西门', category: 'gate',
        coords: [23.163213, 113.346276],
        desc: '华山区西门，靠近动物医院，是进出华山区的重要通道。'
    },
    {
        id: 'gate_north', name: '北门', category: 'gate',
        coords: [23.164748, 113.352270],
        desc: '华农北门，靠近六一区，是进出校园的重要通道之一。'
    },

    // ========== 交通 ==========
    {
        id: 'metro_wushan', name: '五山地铁站', category: 'transport',
        coords: [23.152833, 113.351812],
        desc: '广州地铁3号线五山站A出口，位于西南门（正门）附近，是出入华农最主要的轨道交通站点。',
        tips: '从A出口出站后步行约2分钟即可到达华农正门。'
    },
    {
        id: 'bus_huijing', name: '汇景北路公交总站', category: 'transport',
        coords: [23.152107, 113.363349],
        desc: '位于泰山区附近的公交总站，多条公交线路经停，方便泰山区和启林区学生出行。'
    },

    // ========== 医疗 ==========
    {
        id: 'hospital', name: '校医院', category: 'hospital',
        coords: [23.164323, 113.353153],
        desc: '华南农业大学医院，为师生提供基本医疗保障服务，设有急诊、内科、外科、中医科等科室。',
        tips: '急诊24小时开放，就诊需携带学生证或校园卡。',
        openingHours: '门诊 8:00-12:00, 14:30-17:30；急诊 24小时'
    }
];

// ===== 校园道路网络（简化的路径规划用） =====
const CAMPUS_ROADS = [
    // 华山区内部
    { from: 'gate_southwest', to: 'teaching1', dist: 350 },
    { from: 'gate_southwest', to: 'teaching2', dist: 250 },
    { from: 'gate_southwest', to: 'xiyuan', dist: 300 },
    { from: 'xiyuan', to: 'teaching2', dist: 100 },
    { from: 'teaching1', to: 'teaching3', dist: 200 },
    { from: 'teaching1', to: 'zhumingcaohai', dist: 50 },
    { from: 'teaching3', to: 'lib_main', dist: 150 },
    { from: 'teaching3', to: 'hongze_lake', dist: 100 },
    { from: 'hongze_lake', to: 'building5', dist: 180 },
    { from: 'building5', to: 'hongmantang', dist: 120 },
    { from: 'hongmantang', to: 'museum_agri', dist: 80 },
    { from: 'lib_main', to: 'admin_building', dist: 300 },
    { from: 'lib_main', to: 'hongze_lake', dist: 100 },
    { from: 'xiyuan', to: 'dorm_huashan', dist: 200 },
    { from: 'dorm_huashan', to: 'sport_huashan', dist: 100 },
    { from: 'teaching2', to: 'sport_huashan', dist: 300 },
    { from: 'gate_west', to: 'dorm_huashan', dist: 300 },
    { from: 'dingying_statue', to: 'teaching1', dist: 30 },
    { from: 'dingying_statue', to: 'zhumingcaohai', dist: 50 },
    { from: 'gate_north', to: 'hospital', dist: 100 },

    // 华山 ↔ 泰山（经过紫荆桥）
    { from: 'hongze_lake', to: 'bauhinia_bridge', dist: 600 },
    { from: 'bauhinia_bridge', to: 'teaching4', dist: 300 },
    { from: 'bauhinia_bridge', to: 'zhiyuan', dist: 200 },

    // 泰山区内部
    { from: 'teaching4', to: 'zhiyuan', dist: 150 },
    { from: 'teaching4', to: 'lab_east', dist: 200 },
    { from: 'teaching4', to: 'sport_east', dist: 350 },
    { from: 'zhiyuan', to: 'dorm_taishan', dist: 300 },
    { from: 'sport_east', to: 'dorm_taishan', dist: 250 },
    { from: 'lab_east', to: 'sport_east', dist: 150 },
    { from: 'lab_east', to: 'dorm_taishan', dist: 300 },
    { from: 'dorm_taishan', to: 'bus_huijing', dist: 300 },
    { from: 'teaching4', to: 'poyang_lake', dist: 400 },
    { from: 'poyang_lake', to: 'west_lake', dist: 300 },

    // 华山 ↔ 启林
    { from: 'hongmantang', to: 'teaching5', dist: 900 },
    { from: 'admin_building', to: 'teaching5', dist: 800 },

    // 启林区内部
    { from: 'teaching5', to: 'heyuan', dist: 150 },
    { from: 'teaching5', to: 'dorm_qilin_south', dist: 300 },
    { from: 'heyuan', to: 'dorm_qilin_south', dist: 200 },
    { from: 'dorm_qilin_south', to: 'sport_qilin', dist: 200 },
    { from: 'dorm_qilin_south', to: 'dorm_qilin_north', dist: 400 },
    { from: 'dorm_qilin_north', to: 'daoxiangyuan', dist: 100 },
    { from: 'sport_qilin', to: 'dorm_qilin_north', dist: 300 },

    // 三角市周边
    { from: 'lib_main', to: 'sanjiaoshi', dist: 200 },
    { from: 'admin_building', to: 'sanjiaoshi', dist: 250 },
    { from: 'sanjiaoshi', to: 'lvrongyuan', dist: 50 },
    { from: 'sanjiaoshi', to: 'tianjiabing_gym', dist: 200 },
    { from: 'tianjiabing_gym', to: 'admin_building', dist: 250 },
    { from: 'hongze_lake', to: 'sanjiaoshi', dist: 300 },

    // 其他连接
    { from: 'arboretum', to: 'teaching4', dist: 350 },
    { from: 'arboretum', to: 'lab_east', dist: 400 },
    { from: 'metro_wushan', to: 'gate_southwest', dist: 200 },
];

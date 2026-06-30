import type { TaskPackage } from "../types";

export const taskPackages: TaskPackage[] = [
  {
    id: "travel-captain",
    title: "我是旅行小队长",
    theme: "路线感、选择能力、表达",
    goal: "建立暑假仪式感，让孩子知道自己是小队长。",
    abilities: ["路线感", "选择", "表达"],
    outcomeTargets: ["队徽", "家到公园路线图", "半日游计划"],
    tasks: [
      {
        id: "travel-badge",
        title: "制作城市任务局徽章",
        category: "出发准备",
        steps: ["写上名字", "画队徽", "说出今天的小队口号"],
        prompts: ["你的队伍叫什么？", "今天从哪里出发？"],
        outputTypes: ["photo", "note"]
      },
      {
        id: "home-park-route",
        title: "画家到公园路线",
        category: "路线探索",
        steps: ["数路口", "找方向", "回来画路线"],
        prompts: ["先经过哪里？然后呢？", "哪里需要等红绿灯？"],
        outputTypes: ["route-map", "quote"]
      },
      {
        id: "half-day-plan",
        title: "安排一次半日游",
        category: "计划表达",
        steps: ["选地点", "排先后顺序", "讲旅行计划"],
        prompts: ["先做什么，再做什么？", "你觉得谁在这里工作？"],
        outputTypes: ["quote", "photo"]
      }
    ]
  },
  {
    id: "career-observer",
    title: "城市职业观察员",
    theme: "观察、分类、口头表达",
    goal: "认识常见职业，理解工作是帮助别人解决问题。",
    abilities: ["观察", "分类", "表达"],
    outcomeTargets: ["职业卡 8 张", "工具图", "感谢卡"],
    tasks: [
      {
        id: "cashier-card",
        title: "观察收银员",
        category: "职业卡",
        steps: ["找到收银台", "看使用的工具", "说出帮助了谁"],
        prompts: ["这个职业在哪里工作？", "他用什么工具？", "解决了什么问题？"],
        outputTypes: ["career-card", "quote", "photo"]
      },
      {
        id: "security-tools",
        title: "保安工具图",
        category: "职业工具",
        steps: ["观察站岗位置", "找工具", "画一个工具"],
        prompts: ["保安什么时候要帮忙？", "辛苦在哪里？"],
        outputTypes: ["career-card", "note"]
      },
      {
        id: "cleaner-thanks",
        title: "给清洁员做感谢卡",
        category: "公共环境",
        steps: ["找清洁工具", "说一句谢谢", "做感谢卡"],
        prompts: ["如果没人打扫会怎样？", "我们可以怎么保持干净？"],
        outputTypes: ["career-card", "photo", "quote"]
      }
    ]
  },
  {
    id: "nature-investigator",
    title: "自然调查员",
    theme: "科学观察、分类、耐心记录",
    goal: "用自然观察承接科学启蒙，同时增加户外活动。",
    abilities: ["观察", "比较", "预测"],
    outcomeTargets: ["叶子拓印", "声音地图", "天气表", "生长记录"],
    tasks: [
      {
        id: "three-leaves",
        title: "找 3 种叶子",
        category: "植物观察",
        steps: ["找三片不同叶子", "比较大小形状颜色", "做拓印或拍照"],
        prompts: ["它们哪里不同？", "哪片最大？"],
        outputTypes: ["nature-page", "photo"]
      },
      {
        id: "sound-map",
        title: "找 3 种声音",
        category: "听觉分类",
        steps: ["安静听 1 分钟", "说出三种声音", "画声音地图"],
        prompts: ["声音从哪里来？", "哪个声音最大？"],
        outputTypes: ["nature-page", "quote"]
      },
      {
        id: "bean-growth",
        title: "种豆芽生长记录",
        category: "变化记录",
        steps: ["放豆子", "每天看变化", "记录第几天"],
        prompts: ["明天会不会变化？", "它为什么会这样？"],
        outputTypes: ["nature-page", "photo"]
      }
    ]
  },
  {
    id: "suzhou-architect",
    title: "苏州园林小建筑师",
    theme: "空间、建筑、审美和历史启蒙",
    goal: "把旅行变成空间观察和搭建表达。",
    abilities: ["空间感", "审美", "讲解"],
    outcomeTargets: ["泽一花园积木作品", "桥窗亭观察", "讲解记录"],
    tasks: [
      {
        id: "three-bridges",
        title: "找 3 座桥",
        category: "建筑观察",
        steps: ["找到桥", "看形状", "说用途"],
        prompts: ["桥为什么要这样建？", "你最喜欢哪座桥？"],
        outputTypes: ["photo", "quote"]
      },
      {
        id: "garden-windows",
        title: "找 3 扇窗",
        category: "图案对称",
        steps: ["找窗", "看图案", "说哪里对称"],
        prompts: ["这扇窗像什么？", "两边是不是一样？"],
        outputTypes: ["photo", "note"]
      },
      {
        id: "zeyi-garden",
        title: "搭一个泽一花园",
        category: "回来输出",
        steps: ["用积木搭桥", "加亭子和水", "讲解花园"],
        prompts: ["这里有什么？", "人可以在哪里休息？"],
        outputTypes: ["build-work", "video-note", "quote"]
      }
    ]
  },
  {
    id: "little-shopkeeper",
    title: "小小店长",
    theme: "数学、商业启蒙、假装游戏",
    goal: "把数学和商业启蒙放进真实店铺与家庭游戏。",
    abilities: ["分类", "数量", "礼貌表达"],
    outcomeTargets: ["商品区", "价格牌", "小票", "开店视频"],
    tasks: [
      {
        id: "shop-sorting",
        title: "商品分类",
        category: "分类",
        steps: ["选商品", "按种类摆放", "介绍商品区"],
        prompts: ["为什么放在一起？", "哪个最大？"],
        outputTypes: ["shop-exhibit", "photo", "quote"]
      },
      {
        id: "price-tags",
        title: "给商品标价格",
        category: "数字认识",
        steps: ["写 1-10 元价格", "贴价格牌", "读给妈妈听"],
        prompts: ["这个多少钱？", "5 元可以买几个？"],
        outputTypes: ["shop-exhibit", "note"]
      },
      {
        id: "shop-video",
        title: "店长介绍",
        category: "表达",
        steps: ["当店长", "欢迎顾客", "介绍一个商品"],
        prompts: ["你推荐什么？", "顾客需要排队吗？"],
        outputTypes: ["video-note", "quote"]
      }
    ]
  },
  {
    id: "liangzhu-civilization",
    title: "杭州/良渚文明探索",
    theme: "古人生活、工具、社会分工",
    goal: "从古人怎么生活进入历史和社会启蒙。",
    abilities: ["想象", "比较", "社会分工"],
    outcomeTargets: ["古人生活展", "工具区", "房子区", "工作区"],
    tasks: [
      {
        id: "ancient-tool",
        title: "找一个古代工具",
        category: "工具用途",
        steps: ["找工具", "猜用途", "和今天的工具比较"],
        prompts: ["古人用它做什么？", "今天谁会用类似工具？"],
        outputTypes: ["photo", "quote"]
      },
      {
        id: "ancient-home",
        title: "找古人的家",
        category: "生活方式",
        steps: ["看房子", "找吃饭睡觉的地方", "说不同"],
        prompts: ["古人住在哪里？", "和我们家哪里不一样？"],
        outputTypes: ["photo", "note"]
      },
      {
        id: "ancient-exhibit",
        title: "做古人生活展",
        category: "回来输出",
        steps: ["分吃饭区", "分工具区", "分工作区"],
        prompts: ["谁负责种地？", "谁负责保护大家？"],
        outputTypes: ["shop-exhibit", "quote"]
      }
    ]
  },
  {
    id: "traffic-engineer",
    title: "交通工程师",
    theme: "时间、路线、规则和工程",
    goal: "用交通系统启蒙路线、等待、规则和计划。",
    abilities: ["路线", "时间", "规则"],
    outcomeTargets: ["地铁路线图", "车票模拟", "安全规则卡"],
    tasks: [
      {
        id: "metro-route",
        title: "画地铁路线图",
        category: "线路方向",
        steps: ["找线路颜色", "数几站", "画换乘路线"],
        prompts: ["还有几站？", "我们先坐什么，再换什么？"],
        outputTypes: ["route-map", "photo"]
      },
      {
        id: "bus-map",
        title: "公交站牌地图",
        category: "等待与站点",
        steps: ["找站牌", "看方向", "数等待时间"],
        prompts: ["等了几分钟？", "下一站叫什么？"],
        outputTypes: ["route-map", "quote"]
      },
      {
        id: "safe-crossing",
        title: "安全规则卡",
        category: "规则",
        steps: ["找红绿灯", "看斑马线", "说安全规则"],
        prompts: ["为什么要等绿灯？", "哪里需要排队？"],
        outputTypes: ["note", "photo"]
      }
    ]
  },
  {
    id: "little-curator",
    title: "暑假成果展小馆长",
    theme: "整理、分类、表达闭环",
    goal: "整理整个暑假，完成作品册和小馆长讲解。",
    abilities: ["整理", "复述", "展示"],
    outcomeTargets: ["作品册", "成果展", "小馆长讲解视频"],
    tasks: [
      {
        id: "choose-photos",
        title: "选 8 张任务照片",
        category: "素材整理",
        steps: ["翻看素材", "选喜欢的照片", "说为什么选"],
        prompts: ["这张照片发生了什么？", "你最喜欢哪里？"],
        outputTypes: ["photo", "quote"]
      },
      {
        id: "career-wall",
        title: "整理职业卡",
        category: "分类",
        steps: ["找职业卡", "按地点分类", "讲一个职业"],
        prompts: ["谁在工作？", "他帮助了谁？"],
        outputTypes: ["career-card", "video-note"]
      },
      {
        id: "curator-talk",
        title: "小馆长讲解",
        category: "成果表达",
        steps: ["介绍任务局", "说去过的地方", "讲最喜欢的研究"],
        prompts: ["这是我的暑假任务局", "我下次还想研究什么？"],
        outputTypes: ["video-note", "quote"]
      }
    ]
  }
];


// 树形结构的数据定义
export const treeRecords = [
  {
    department: '技术部',
    total_members: 45,
    monthly_expense: '¥180,000',
    new_hires_this_month: 8,
    resignations_this_month: 2,
    performance_score: 4.5,
    children: [
      {
        group: '前端开发组',
        total_members: 15,
        monthly_expense: '¥75,000',
        new_hires_this_month: 3,
        resignations_this_month: 1,
        performance_score: 4.6,
        children: [
          {
            name: '张三',
            position: '前端架构师',
            salary: '¥25,000',
            experience: '5年',
            skills: 'React, Vue, TypeScript'
          },
          {
            name: '李四',
            position: '高级前端工程师',
            salary: '¥18,000',
            experience: '3年',
            skills: 'React, JavaScript, CSS'
          },
          {
            name: '王五',
            position: '前端工程师',
            salary: '¥12,000',
            experience: '2年',
            skills: 'Vue, JavaScript, HTML'
          }
        ]
      },
      {
        group: '后端开发组',
        total_members: 20,
        monthly_expense: '¥85,000',
        new_hires_this_month: 4,
        resignations_this_month: 1,
        performance_score: 4.4,
        children: [
          {
            name: '赵六',
            position: '后端架构师',
            salary: '¥28,000',
            experience: '6年',
            skills: 'Java, Spring, MySQL'
          },
          {
            name: '钱七',
            position: '高级后端工程师',
            salary: '¥20,000',
            experience: '4年',
            skills: 'Python, Django, PostgreSQL'
          },
          {
            name: '孙八',
            position: '后端工程师',
            salary: '¥15,000',
            experience: '2年',
            skills: 'Node.js, Express, MongoDB'
          }
        ]
      },
      {
        group: '测试组',
        total_members: 10,
        monthly_expense: '¥40,000',
        new_hires_this_month: 1,
        resignations_this_month: 0,
        performance_score: 4.3,
        children: [
          {
            name: '周九',
            position: '测试经理',
            salary: '¥22,000',
            experience: '5年',
            skills: '自动化测试, 性能测试'
          },
          {
            name: '吴十',
            position: '高级测试工程师',
            salary: '¥16,000',
            experience: '3年',
            skills: 'Selenium, JMeter'
          }
        ]
      }
    ]
  },
  {
    department: '产品部',
    total_members: 25,
    monthly_expense: '¥120,000',
    new_hires_this_month: 3,
    resignations_this_month: 1,
    performance_score: 4.2,
    children: [
      {
        group: '产品设计组',
        total_members: 12,
        monthly_expense: '¥65,000',
        new_hires_this_month: 2,
        resignations_this_month: 0,
        performance_score: 4.4,
        children: [
          {
            name: '郑十一',
            position: '产品总监',
            salary: '¥30,000',
            experience: '7年',
            skills: '产品规划, 用户研究'
          },
          {
            name: '王十二',
            position: '高级产品经理',
            salary: '¥22,000',
            experience: '4年',
            skills: '需求分析, 原型设计'
          }
        ]
      },
      {
        group: 'UI/UX设计组',
        total_members: 13,
        monthly_expense: '¥55,000',
        new_hires_this_month: 1,
        resignations_this_month: 1,
        performance_score: 4.0,
        children: [
          {
            name: '冯十三',
            position: 'UI设计师',
            salary: '¥18,000',
            experience: '3年',
            skills: 'Figma, Sketch, Adobe XD'
          },
          {
            name: '陈十四',
            position: 'UX设计师',
            salary: '¥20,000',
            experience: '4年',
            skills: '用户体验, 交互设计'
          }
        ]
      }
    ]
  },
  {
    department: '运营部',
    total_members: 18,
    monthly_expense: '¥85,000',
    new_hires_this_month: 2,
    resignations_this_month: 0,
    performance_score: 4.1,
    children: [
      {
        group: '市场运营组',
        total_members: 10,
        monthly_expense: '¥50,000',
        new_hires_this_month: 1,
        resignations_this_month: 0,
        performance_score: 4.2,
        children: [
          {
            name: '褚十五',
            position: '运营总监',
            salary: '¥25,000',
            experience: '6年',
            skills: '市场策略, 数据分析'
          },
          {
            name: '卫十六',
            position: '高级运营专员',
            salary: '¥15,000',
            experience: '3年',
            skills: '内容运营, 社媒推广'
          }
        ]
      },
      {
        group: '客户服务组',
        total_members: 8,
        monthly_expense: '¥35,000',
        new_hires_this_month: 1,
        resignations_this_month: 0,
        performance_score: 4.0,
        children: [
          {
            name: '蒋十七',
            position: '客服经理',
            salary: '¥18,000',
            experience: '4年',
            skills: '客户关系, 问题解决'
          },
          {
            name: '沈十八',
            position: '客服专员',
            salary: '¥12,000',
            experience: '2年',
            skills: '沟通技巧, 服务意识'
          }
        ]
      }
    ]
  }
];

// 树形表格的列定义
export const treeColumns = [
  {
    field: 'department',
    title: '部门/组别/姓名',
    width: 280,
    tree: true, // 启用树形显示
    fieldFormat: (rec: any) => {
      // 根据数据层级显示不同的字段
      if (rec?.name) {
        return rec.name; // 个人层级显示姓名
      } else if (rec?.group) {
        return rec.group; // 组别层级显示组名
      } else if (rec?.department) {
        return rec.department; // 部门层级显示部门名
      }
      return '';
    }
  },
  {
    field: 'total_members',
    title: '成员数量/职位',
    width: 180,
    fieldFormat: (rec: any) => {
      if (rec?.position) {
        return `职位: ${rec.position}`;
      } else if (rec?.total_members) {
        return `${rec.total_members}人`;
      }
      return '';
    }
  },
  {
    field: 'monthly_expense',
    title: '月度支出/薪资',
    width: 150,
    fieldFormat: (rec: any) => {
      if (rec?.salary) {
        return `薪资: ${rec.salary}`;
      } else if (rec?.monthly_expense) {
        return rec.monthly_expense;
      }
      return '';
    }
  },
  {
    field: 'new_hires_this_month',
    title: '本月新增/工作经验',
    width: 150,
    fieldFormat: (rec: any) => {
      if (rec?.experience) {
        return `经验: ${rec.experience}`;
      } else if (rec?.new_hires_this_month !== undefined) {
        return `新增: ${rec.new_hires_this_month}人`;
      }
      return '';
    }
  },
  {
    field: 'resignations_this_month',
    title: '本月离职/技能',
    width: 200,
    fieldFormat: (rec: any) => {
      if (rec?.skills) {
        return `技能: ${rec.skills}`;
      } else if (rec?.resignations_this_month !== undefined) {
        return `离职: ${rec.resignations_this_month}人`;
      }
      return '';
    }
  },
  {
    field: 'performance_score',
    title: '绩效评分',
    width: 120,
    fieldFormat: (rec: any) => {
      if (rec?.performance_score) {
        return `${rec.performance_score}/5.0`;
      }
      return '';
    }
  }
];
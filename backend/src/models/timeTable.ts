import { Subject } from "./subject";
import { Section } from "./section";
import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class TimeTable extends Model {}

TimeTable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sectionId: {
      field: "subject_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Section,
        key: "id",
      },
    },
    period1SubjectId: {
      field: "period1_subject_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    period2SubjectId: {
      field: "period2_subject_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    period3SubjectId: {
      field: "period3_subject_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    period4SubjectId: {
      field: "period4_subject_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    period5SubjectId: {
      field: "period5_subject_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    period6SubjectId: {
      field: "period6_subject_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    period7SubjectId: {
      field: "period7_subject_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    period8SubjectId: {
      field: "period8_subject_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "time_table",
    timestamps: false,
  }
);

TimeTable.belongsTo(Section, {
  foreignKey: "section_id",
  as: "section",
});

Section.hasMany(TimeTable, {
  foreignKey: "section_id",
});

TimeTable.belongsTo(Subject, {
  foreignKey: "period1_subject_id",
  as: "period1Subject",
});
TimeTable.belongsTo(Subject, {
  foreignKey: "period2_subject_id",
  as: "period2Subject",
});
TimeTable.belongsTo(Subject, {
  foreignKey: "period3_subject_id",
  as: "period3Subject",
});
TimeTable.belongsTo(Subject, {
  foreignKey: "period4_subject_id",
  as: "period4Subject",
});
TimeTable.belongsTo(Subject, {
  foreignKey: "period5_subject_id",
  as: "period5Subject",
});
TimeTable.belongsTo(Subject, {
  foreignKey: "period6_subject_id",
  as: "period6Subject",
});
TimeTable.belongsTo(Subject, {
  foreignKey: "period7_subject_id",
  as: "period7Subject",
});
TimeTable.belongsTo(Subject, {
  foreignKey: "period8_subject_id",
  as: "period8Subject",
});

Subject.hasMany(TimeTable, {
  foreignKey: "period1_subject_id",
});
Subject.hasMany(TimeTable, {
  foreignKey: "period2_subject_id",
});
Subject.hasMany(TimeTable, {
  foreignKey: "period3_subject_id",
});
Subject.hasMany(TimeTable, {
  foreignKey: "period4_subject_id",
});
Subject.hasMany(TimeTable, {
  foreignKey: "period5_subject_id",
});
Subject.hasMany(TimeTable, {
  foreignKey: "period6_subject_id",
});
Subject.hasMany(TimeTable, {
  foreignKey: "period7_subject_id",
});
Subject.hasMany(TimeTable, {
  foreignKey: "period8_subject_id",
});

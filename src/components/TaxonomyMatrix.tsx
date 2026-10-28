import React from 'react';
import { TOPICS } from '../data/topics';
import { TopicId } from '../types/procurement';
import { 
  Layers, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  FileCheck2, 
  FileSignature, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

interface TaxonomyMatrixProps {
  onSelectTopicAndSubgroup: (topicId: TopicId, subgroupCode?: string) => void;
}

export const TaxonomyMatrix: React.FC<TaxonomyMatrixProps> = ({
  onSelectTopicAndSubgroup,
}) => {
  const getTopicIcon = (id: TopicId) => {
    switch (id) {
      case 1: return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 2: return <Layers className="w-5 h-5 text-indigo-600" />;
      case 3: return <Clock className="w-5 h-5 text-amber-600" />;
      case 4: return <FileCheck2 className="w-5 h-5 text-emerald-600" />;
      case 5: return <FileSignature className="w-5 h-5 text-rose-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
            📊
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base sm:text-lg">
              Cây Kiến thức Cơ sở & Ma trận 395 Câu hỏi
            </h2>
            <p className="text-xs text-slate-500">
              Phân loại khoa học thành 5 Chuyên đề cốt lõi và 24 nhóm kiến thức chuyên sâu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => onSelectTopicAndSubgroup(1)}
            className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            Luyện ngay toàn bộ 395 câu
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {TOPICS.map((topic) => (
          <div
            key={topic.id}
            onClick={() => onSelectTopicAndSubgroup(topic.id)}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all cursor-pointer text-center"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-50 mx-auto flex items-center justify-center mb-2">
              {getTopicIcon(topic.id)}
            </div>
            <div className="font-bold text-slate-900 text-xs line-clamp-1">
              CĐ {topic.id}
            </div>
            <div className="text-sm font-extrabold text-blue-600 mt-0.5">
              {topic.totalQuestions} câu
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {topic.subgroups.length} nhóm
            </div>
          </div>
        ))}
      </div>

      {/* 5 Deep-dive Topics with 24 Subgroups */}
      <div className="space-y-6">
        {TOPICS.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4"
          >
            {/* Topic Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center">
                  {getTopicIcon(topic.id)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {topic.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {topic.questionRange.label}
                </span>
                <button
                  onClick={() => onSelectTopicAndSubgroup(topic.id)}
                  className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  Luyện CĐ {topic.id}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Subgroups Table / List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {topic.subgroups.map((sub) => (
                <div
                  key={sub.code}
                  onClick={() => onSelectTopicAndSubgroup(topic.id, sub.code)}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                        Nhóm {sub.code}
                      </span>
                      <span className="text-[11px] font-bold text-slate-600">
                        {sub.count} câu
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs group-hover:text-blue-600 transition-colors line-clamp-2">
                      {sub.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[170px]" title={sub.articles}>
                      📜 {sub.articles}
                    </span>
                    <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center">
                      Luyện 👉
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

# scripts/compile_all_395.py
# -*- coding: utf-8 -*-
import json
import os
import sys

from data_topic1 import get_topic1_questions
from data_topic2 import get_topic2_questions
from data_topic3 import get_topic3_questions
from data_topic4 import get_topic4_questions
from data_topic5 import get_topic5_questions

def build():
    all_raw = []
    all_raw.extend(get_topic1_questions())
    all_raw.extend(get_topic2_questions())
    all_raw.extend(get_topic3_questions())
    all_raw.extend(get_topic4_questions())
    all_raw.extend(get_topic5_questions())

    print(f"Total raw questions collected: {len(all_raw)}")

    questions = []
    for raw in all_raw:
        q_id = raw[0]
        top_id = raw[1]
        top_name = raw[2]
        sub_code = raw[3]
        title_suffix = raw[4]
        content = raw[5]
        ans = raw[6]
        correct = raw[7]
        d1 = raw[8]
        d2 = raw[9]
        d3 = raw[10]
        expl = raw[11]
        legal = raw[12]
        diff = raw[13]

        opts = {}
        if ans == 'A':
            opts = {'A': correct, 'B': d1, 'C': d2, 'D': d3}
        elif ans == 'B':
            opts = {'A': d1, 'B': correct, 'C': d2, 'D': d3}
        elif ans == 'C':
            opts = {'A': d1, 'B': d2, 'C': correct, 'D': d3}
        else:
            opts = {'A': d1, 'B': d2, 'C': d3, 'D': correct}

        clean_title = f"Câu {q_id}: {title_suffix} ({diff})"

        q_obj = {
            "id": q_id,
            "topicId": top_id,
            "topicName": top_name,
            "subgroupCode": sub_code,
            "title": clean_title,
            "content": content,
            "options": opts,
            "correctAnswer": ans,
            "explanation": expl,
            "legalBasis": legal,
            "difficulty": diff,
            "tags": [sub_code, diff.lower(), "nghiệp vụ đấu thầu"]
        }
        questions.append(q_obj)

    # Validations
    assert len(questions) == 395, f"Expected 395 questions, got {len(questions)}"
    
    # ID check
    ids = [q["id"] for q in questions]
    assert len(set(ids)) == 395, "Duplicate IDs found!"
    assert min(ids) == 1 and max(ids) == 395, f"ID range error: min={min(ids)}, max={max(ids)}"

    # Content uniqueness check (THE USER'S PRIMARY COMPLAINT)
    contents = [q["content"] for q in questions]
    unique_contents = set(contents)
    if len(unique_contents) != 395:
        print(f"ERROR: Found duplicate contents! Total={len(contents)}, Unique={len(unique_contents)}")
        # Find duplicates
        seen = set()
        dups = set()
        for c in contents:
            if c in seen:
                dups.add(c)
            seen.add(c)
        for d in dups:
            print("DUPLICATE:", d[:80])
        sys.exit(1)
    print("✓ 100% UNIQUE Question Contents verified! (Zero repetition)")

    # Title uniqueness check
    titles = [q["title"] for q in questions]
    assert len(set(titles)) == 395, "Duplicate titles found!"
    print("✓ 100% UNIQUE Titles verified!")

    # Check that NO level brackets [Cấp độ...] exist anywhere
    for q in questions:
        assert "[Cấp độ" not in q["title"], f"Found bracket in title: {q['title']}"
        assert "[Cấp độ" not in q["content"], f"Found bracket in content: {q['content']}"

    print("✓ Zero [Cấp độ...] brackets verified!")

    # Distribution check per topic
    for t_id, exp_cnt in [(1, 85), (2, 75), (3, 70), (4, 90), (5, 75)]:
        cnt = sum(1 for q in questions if q["topicId"] == t_id)
        assert cnt == exp_cnt, f"Topic {t_id} count mismatch: {cnt} vs {exp_cnt}"
    print("✓ All 5 Topics match exact question counts (85, 75, 70, 90, 75)")

    # Check 24 subgroups
    expected_subgroups = {
        '1.1': 20, '1.2': 20, '1.3': 15, '1.4': 15, '1.5': 15,
        '2.1': 15, '2.2': 20, '2.3': 15, '2.4': 10, '2.5': 15,
        '3.1': 20, '3.2': 20, '3.3': 15, '3.4': 15,
        '4.1': 25, '4.2': 15, '4.3': 25, '4.4': 10, '4.5': 15,
        '5.1': 20, '5.2': 15, '5.3': 15, '5.4': 15, '5.5': 10,
    }
    for sub, exp in expected_subgroups.items():
        cnt = sum(1 for q in questions if q["subgroupCode"] == sub)
        assert cnt == exp, f"Subgroup {sub} count mismatch: {cnt} vs {exp}"
    print("✓ All 24 Subgroups match exact taxonomy counts!")

    # Write to src/data/questions.ts
    out_path = os.path.join(os.path.dirname(__file__), '../src/data/questions.ts')
    header = """/**
 * Ngân hàng 395 câu hỏi trắc nghiệm ôn thi chứng chỉ nghiệp vụ đấu thầu
 * Bản quyền Bunny - 100% câu hỏi chuyên sâu, độc lập, không trùng lặp
 * Chuẩn hóa theo Luật Đấu thầu 22/2023/QH15, Luật 57/2024/QH15 & Nghị định 214/2025/NĐ-CP
 */

import { Question } from '../types/procurement';

export const QUESTIONS: Question[] = """

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(header)
        f.write(json.dumps(questions, ensure_ascii=False, indent=2))
        f.write(";\n")

    print(f"Successfully generated {len(questions)} authentic questions to {out_path}!")

if __name__ == '__main__':
    build()

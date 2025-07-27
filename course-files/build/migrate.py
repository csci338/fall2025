from datetime import datetime
import re


def get_original_lines(file_path):
    pattern = r'(\d{4}-\d{2}-\d{2})'  # Captures dates like 2024-12-29
    matches = []

    # Read the file and search for matches
    with open(file_path, 'r') as file:
        for line in file:
            match = re.search(pattern, line)
            if match:
                matches.append((line.strip(), match.group(1)))
    return matches


def get_replacement_line(line_tuple, time_delta, current_start):
    line = line_tuple[0]
    replace_me = line_tuple[1]
    d = datetime.strptime(replace_me, '%Y-%m-%d')
    if d < current_start:
        d = d + time_delta
        return line.replace(replace_me, d.strftime('%Y-%m-%d'))
    return line


def do_replacement(old_line, new_line, file_path):
    with open(file_path, 'r') as file:
        filedata = file.read()
    file.close()

    # Replace the target string
    filedata = filedata.replace(old_line, new_line)

    # Write the file out again
    with open(file_path, 'w') as file:
        file.write(filedata)
    file.close()


def get_files(file_path):
    import glob
    file_paths = []
    types = ('*.md', '*.scss', '*.html')
    for type in types:
        for file in glob.glob(file_path + '/' + type):
            file_paths.append(file)
    return file_paths


def migrate_date(old_date, new_date, file_path):
    past_start = datetime.strptime(old_date, '%Y-%m-%d')
    current_start = datetime.strptime(new_date, '%Y-%m-%d')
    diff = current_start - past_start

    old_line_tuples = get_original_lines(file_path)
    for old_line_tuple in old_line_tuples:
        old_line = old_line_tuple[0]
        new_line = get_replacement_line(old_line_tuple, diff, current_start)
        do_replacement(old_line, new_line, file_path)


if __name__ == '__main__':
    old_date = '2025-08-18'
    new_date = '2025-08-18'
    file_paths = get_files('../../pages/_lectures')
    file_paths += get_files('../../pages/_assignments')
    file_paths += get_files('../../pages/_activities')
    file_paths += get_files('../../pages/_quizzes')
    print(file_paths)
    for file_path in file_paths:
        print(file_path)
        migrate_date(old_date, new_date, file_path)
        print(file_path, 'migrated.')

    # global find and replace:
    file_paths += get_files('../../pages/resources')
    file_paths += get_files('../../pages')
    file_paths += get_files('../../_sass/minima')
    file_paths += get_files('../../_layouts')
    file_paths += get_files('../../_includes')
    # for file_path in file_paths:
    #     # do_replacement('CSCI XXX', 'CSCI 185', file_path)
    #     do_replacement('draft: 1', 'draft: 1', file_path)
    #     # do_replacement('Northwestern University', 'UNCA', file_path)
    #     # do_replacement('Northwestern', 'UNCA', file_path)

start cmd /k "cd gitTree && git log --graph --full-history --all --pretty=format:^"%x09%d%x20%s^" > GitTree.txt"

start cmd /k "cd ../fullJDT-tropD_infos && git log --pretty=format:^"%h - %an, %ar : %s^" --stat > journal_de_travail.txt"

import os, random, shutil

# Config
SRC_ROOT   = "data/raw"
TEST_ROOT  = "data/test"
TEST_FRAC  = 0.1  # 10% for test

# For each class folder
for cls in os.listdir(SRC_ROOT):
    src_cls_dir  = os.path.join(SRC_ROOT, cls)
    dst_cls_dir  = os.path.join(TEST_ROOT, cls)
    os.makedirs(dst_cls_dir, exist_ok=True)

    files = [f for f in os.listdir(src_cls_dir)
             if f.lower().endswith((".jpg",".png"))]
    n_test = max(1, int(len(files) * TEST_FRAC))
    test_files = random.sample(files, n_test)

    # Move files
    for fn in test_files:
        shutil.move(
          os.path.join(src_cls_dir, fn),
          os.path.join(dst_cls_dir, fn)
        )

    print(f"{cls}: moved {len(test_files)} files to test/")
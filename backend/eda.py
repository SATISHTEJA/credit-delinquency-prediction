import pandas as pd

# Load dataset
df = pd.read_csv(
    r"../dataset/statlog+german+credit+data/german.data-numeric",
    sep=r"\s+",
    header=None
)

print("Shape:", df.shape)

# Features
X = df.iloc[:, :-1]

# Target
y = df.iloc[:, -1]

# Convert target
# 1 = Good Credit -> 0
# 2 = Bad Credit -> 1

y = y.map({1: 0, 2: 1})

print("\nTarget Distribution:")
print(y.value_counts())

print("\nMissing Values:")
print(df.isnull().sum().sum())
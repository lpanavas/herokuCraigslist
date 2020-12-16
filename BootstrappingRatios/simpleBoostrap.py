
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import shapiro
from scipy.stats import skew

sound50A = np.array([3.46, 3.56, 7.28, 3.77])
noSound50A = np.array([10.11, 9.44, 14.86, 10.12])
sound100A = np.array([6.75, 3.49, 5.83, 3.53])
noSound100A = np.array([11.805, 12.03, 45.26, 42.33])
sound200A = np.array([3.59, 6.32, 4.07, 4.79])
noSound200A = np.array([41.09, 47.36, 423.6369, 47.36, 510.5835])
sound400A = np.array([9.81, 3.51, 7.01])
noSound400A = np.array([47.41, 147.11, 30.61, 44.12])

sound50S = np.array([3.43, 3.73, 3.21, 4.7])
noSound50S = np.array([7.54, 16.78, 7.4, 9.98])
sound100S = np.array([3.21, 7.08, 7.27, 5.68])
noSound100S = np.array([7.38, 7.23, 7.89, 19.8])
sound200S = np.array([4.92, 2.73, 7.69, 4.36])
noSound200S = np.array([41.06, 11.09, 20.05, 79.33])
sound400S = np.array([4.911, 6.81, 4.91, 7.61])
noSound400S = np.array([7.11, 74.5, 33.71, 10.01])

sound50D = np.array([6.26, 4.11, 3.9, 2.56])
noSound50D = np.array([5.74, 4.05, 5.79, 5.04])
sound100D = np.array([17.21, 3.03, 5.31, 3.74])
noSound100D = np.array([24.74, 7.63, 8.53, 5.81])
sound200D = np.array([7.81, 3.53, 4.04, 6.35])
noSound200D = np.array([9.855, 28.49, 79.13, 21.27])
sound400D = np.array([6.31, 4.71, 6.01, 27.81])
noSound400D = np.array([29.71, 26.71, 40.21])

sound50U = np.array([15.98, 11.57, 10.72, 35.78])
noSound50U = np.array([14.36, 52.22, 16.93, 6.44])
sound100U = np.array([32.82, 19.83, 35.4, 24.77])
noSound100U = np.array([23.56, 95.27, 40.83, 7.52])
sound200U = np.array([41.84, 9.34, 17.71, 38.96])
noSound200U = np.array([45.3, 13.93, 10.87, 31.84])
sound400U = np.array([7.51, 71.61, 50.91, 98.81])
noSound400U = np.array([33.61, 33.11, 8.01])

sound50J = np.array([14.74, 51.35, 20.57, 14.56])
noSound50J = np.array([16.73, 12.71, 23.54, 16.61])
sound100J = np.array([12.16, 11.78, 12.29, 12.617])
noSound100J = np.array([8.8, 9.96, 12.18, 31.6])
sound200J = np.array([6.23, 12.5, 5.97, 63.83])
noSound200J = np.array([132.93, 106.96, 13.51, 57.96])
sound400J = np.array([18.31, 75.71, 30.11, 58.61])
noSound400J = np.array([98.91, 60.91, 12.41, 44.11])

sound50B = np.array([3.28, 4.46, 4.39, 2.49])
noSound50B = np.array([37, 4.61, 4.98, 3.61])
sound100B = np.array([1.95, 3.42, 2.599, 1.58])
noSound100B = np.array([2.49, 10.3, 18.322, 4.16])
sound200B = np.array([2.711, 5.72, 2.23, 5.54])
noSound200B = np.array([29.09, 4.68, 5.85, 2.6])
sound400B = np.array([8.51, 3.21, 2.11, 1.81])
noSound400B = np.array([343.52, 65.71, 18.31, 13.91])


sample_props = []
for _ in range(100000):
    sampleSound = np.random.choice(sound200J, size=4)
    sampleNoSound = np.random.choice(noSound200J, size=4)
    sampleSoundMean = sampleSound.mean()
    sampleNoSoundMean = sampleNoSound.mean()
    logRatio = np.log(sampleNoSoundMean/sampleSoundMean)
    sample_props.append(logRatio)

simulated_mean = np.mean(sample_props)
simulated_std = np.std(sample_props)


stat, p = shapiro(sample_props)
skewData = skew(sample_props)
print(skewData)
print('Statistics=%.3f, p=%.3f' % (stat, p))
# interpret
alpha = 0.05
if p > alpha:
    print('Sample looks Gaussian (fail to reject H0)')
else:
    print('Sample does not look Gaussian (reject H0)')

print(simulated_mean)
print(simulated_std)
plt.hist(sample_props)

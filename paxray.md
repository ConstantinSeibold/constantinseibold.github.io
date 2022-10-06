---
layout: stacked
---

#  PAXRAY: A Projected dataset for the segmentation of Anatomical structures in X-RAY data
![Title Image](https://github.com/ConstantinSeibold/constantinseibold.github.io/_images/paxray/paxray_xample.png)

> [**Detailed Annotations of Chest X-Rays via CT Projection for Report Understanding.**](https://arxiv.org/pdf/)<br>
> Constantin Seibold, Simon Reiß, Saquib Sarfraz, Matthias A. Fink, Victoria Mayer, Jan Sellner, Moon Sung Kim, Klaus H. Maier-Hein, Jens Kleesiek and Rainer Stiefelhagen, <br>
>
> **Abstract:** *In clinical radiology reports, doctors capture important information about the patient's health status. They convey their observations from raw medical imaging data about the inner structures of a patient. As such, formulating reports requires medical experts to possess wide-ranging knowledge about anatomical regions with their normal, healthy appearance as well as the ability to recognize abnormalities. This explicit grasp on both the patient's anatomy and their appearance is missing in current medical image-processing systems as annotations are especially difficult to gather. This renders the models to be narrow experts \eg for identifying specific diseases. In this work, we recover this missing link by adding human anatomy into the mix and enable the association of content in medical reports to their occurrence in associated imagery (medical phrase grounding).  exploit anatomical structures in this scenario, we present a sophisticated automatic pipeline to gather and integrate human bodily structures from computed tomography datasets, which we incorporate in our *PAXRay*: A _*P*_rojected dataset for the segmentation of _*A*_natomical structures in _*X-Ray*_ data.   Our evaluation shows that methods that take advantage of anatomical information benefit heavily in visually grounding radiologists' findings, as our anatomical segmentations allow for up to absolute 50% better grounding results on the OpenI dataset as compared to commonly used region proposals.*

## Dataset 

The dataset is available by clicking the folder:
[<img src="https://github.com/ConstantinSeibold/constantinseibold.github.io/_images/common/folder(1).png" height="15">](https://drive.google.com/drive/folders/1rzlsZ0bfByRMBoywOPWZW08GNgIwCU9P?usp=sharing)

## Pre-Trained Models

The pre-trained models are available by clicking the respective link below:

| Model        | mIoU      | Link       |
|--------------|-----------|------------|
| UNet         |     -     |   [weights](https://drive.google.com/drive/folders/1JjWv_Ips_8CKbREk68JY-YMpu_lXu5Sa?usp=sharing)       |


## Citation
If you use this work or dataset, please cite:
```latex
@inproceedings{spl,
    author    = {Seibold,Constantin and Reiß,Simon and Sarfraz,Saquib and Fink,Matthias A. and Mayer,Victoria and Sellner,Jan and Kim,Moon Sung and Maier-Hein, Klaus H.  and Kleesiek, Jens  and Stiefelhagen,Rainer}, 
    title     = {Detailed Annotations of Chest X-Rays via CT Projection for Report Understanding}, 
    booktitle = {Proceedings of the 33th British Machine Vision Conference (BMVC)},
    year  = {2022}
}

```


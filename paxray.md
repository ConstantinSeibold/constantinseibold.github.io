---
layout: default
---

<h1 id="paxray-a-projected-dataset-for-the-segmentation-of-anatomical-structures-in-x-ray-data">PAXRAY: A Projected dataset for the segmentation of Anatomical structures in X-RAY data</h1>
<p><img src="https://github.com/ConstantinSeibold/constantinseibold.github.io/blob/master/_images/paxray/paxray_xample.png?raw=true" width=80% height=auto></p>
<blockquote>
<p><a href="https://arxiv.org/pdf/"><strong>Detailed Annotations of Chest X-Rays via CT Projection for Report Understanding.</strong></a><br>
Constantin Seibold, Simon Reiß, Saquib Sarfraz, Matthias A. Fink, Victoria Mayer, Jan Sellner, Moon Sung Kim, Klaus H. Maier-Hein, Jens Kleesiek and Rainer Stiefelhagen<br></p>
<p><strong>Abstract:</strong> <em>In clinical radiology reports, doctors capture important information about the patient&#39;s health status. They convey their observations from raw medical imaging data about the inner structures of a patient. As such, formulating reports requires medical experts to possess wide-ranging knowledge about anatomical regions with their normal, healthy appearance as well as the ability to recognize abnormalities. This explicit grasp on both the patient&#39;s anatomy and their appearance is missing in current medical image-processing systems as annotations are especially difficult to gather. This renders the models to be narrow experts e.g. for identifying specific diseases. In this work, we recover this missing link by adding human anatomy into the mix and enable the association of content in medical reports to their occurrence in associated imagery (medical phrase grounding). To exploit anatomical structures in this scenario, we present a sophisticated automatic pipeline to gather and integrate human bodily structures from computed tomography datasets, which we incorporate in our </em>PAXRay<em>: A </em>P<em>rojected dataset for the segmentation of </em>A<em>natomical structures in </em>X-Ray<em> data.   Our evaluation shows that methods that take advantage of anatomical information benefit heavily in visually grounding radiologists&#39; findings, as our anatomical segmentations allow for up to absolute 50% better grounding results on the OpenI dataset as compared to commonly used region proposals.</em></p>
</blockquote>
<h2 id="dataset">Dataset</h2>
<p>The dataset is available by clicking the folder:
<a href="https://drive.google.com/drive/folders/1rzlsZ0bfByRMBoywOPWZW08GNgIwCU9P?usp=sharing"><img src="https://github.com/ConstantinSeibold/constantinseibold.github.io/blob/master/_images/common/folder(1).png?raw=true" height="15"></a></p>
<h2 id="pre-trained-models">Pre-Trained Models</h2>
<p>The pre-trained models are available by clicking the respective link below:</p>
<table>
<thead>
<tr>
<th>Model</th>
<th>mIoU</th>
<th>Link</th>
</tr>
</thead>
<tbody>
<tr>
<td>UNet</td>
<td>-</td>
<td><a href="https://drive.google.com/drive/folders/1JjWv_Ips_8CKbREk68JY-YMpu_lXu5Sa?usp=sharing">weights</a></td>
</tr>
</tbody>
</table>
<h2 id="citation">Citation</h2>
<p>If you use this work or dataset, please cite:</p>
<pre><code class="lang-latex">@inproceedings{paxray,
    author    = {Seibold,Constantin <span class="hljs-keyword">and </span>Reiß,Simon <span class="hljs-keyword">and </span>Sarfraz,Saquib <span class="hljs-keyword">and </span>Fink,Matthias A. <span class="hljs-keyword">and </span>Mayer,Victoria <span class="hljs-keyword">and </span>Sellner,<span class="hljs-keyword">Jan </span><span class="hljs-keyword">and </span>Kim,Moon Sung <span class="hljs-keyword">and </span>Maier-Hein, Klaus H.  <span class="hljs-keyword">and </span>Kleesiek, <span class="hljs-keyword">Jens </span> <span class="hljs-keyword">and </span>Stiefelhagen,Rainer}, 
    title     = {Detailed Annotations of Chest X-Rays via CT Projection for Report Understanding}, 
    <span class="hljs-keyword">booktitle </span>= {Proceedings of the <span class="hljs-number">33</span>th <span class="hljs-keyword">British </span>Machine Vision Conference (<span class="hljs-keyword">BMVC)},
</span>    year  = {<span class="hljs-number">2022</span>}
}
</code></pre>

package com.ahmed.courses.entities;

import jakarta.persistence.*;

@Entity
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCourse;
	private String nomCourse;
	private Double prixCourse;
	private String detailsCourse;

	@OneToOne
	private Image image; // This is valid as Image is properly annotated as @Entity

	// Constructors
	public Course(String nomCourse, Double prixCourse, String detailsCourse) {
		this.nomCourse = nomCourse;
		this.prixCourse = prixCourse;
		this.detailsCourse = detailsCourse;
	}

	public Course() {
		super();
	}

	// Getters and Setters
	public Long getIdCourse() {
		return idCourse;
	}

	public String getNomCourse() {
		return nomCourse;
	}

	public void setNomCourse(String nomCourse) {
		this.nomCourse = nomCourse;
	}

	public Double getPrixCourse() {
		return prixCourse;
	}

	public void setPrixCourse(Double prixCourse) {
		this.prixCourse = prixCourse;
	}

	public String getDetailsCourse() {
		return detailsCourse;
	}

	public void setDetailsCourse(String detailsCourse) {
		this.detailsCourse = detailsCourse;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}
}
